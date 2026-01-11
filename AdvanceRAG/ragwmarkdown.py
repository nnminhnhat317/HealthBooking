##
'''
Docstring for ragwmarkdown
File này chứa logic chunk, lưu vào vector chroma với định dạng Document() của Langchain. Với nguồn dữ liệu là markdown specialty từ API
'''
##

import requests
from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings
import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
openai_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=openai_key) # Khởi tạo client OpenAI để gọi chat.completions.create
openai_ef = OpenAIEmbeddings( # Khởi tạo embedding function từ OpenAI
    model="text-embedding-3-small",
    api_key=openai_key,
)

# Gọi API để lấy danh sách markdown specialty
res_doc = requests.get("http://localhost:8080/markdown/doctor")
doctor_list_response = res_doc.json()
# output la mang danh sach mỗi object doctor: [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
# {id: 1, doctorId: 7, contentMarkdown: '**Bác sĩ Chuyên khoa II Lê Hồng Anh**\n\n- Chuyên gi…í, truyền hình…**\n\n- HTV9\n- HTV7\n- Báo Thanh Niên', doctorName: 'bacsi bacsi', specialtyName: 'Răng hàm mặt',...}
# có 6 trường dữ liệu trả về: id, doctorId, contentMarkdown, doctorName, specialtyName, description

# Gọi API để lấy danh sách markdown specialty
res_spec = requests.get("http://localhost:8080/markdown/specialty")
markdown_list_response = res_spec.json() #output: [{"id":2,"doctorId":null,"clinicId":null,"specialtyId":2,"contentMarkdown":"## **Cơ Xương Khớp**\n\n**Bác sĩ Cơ Xương Khớp giỏi**\n\nDanh sách các bác sĩ uy tín đầu ngành Cơ Xương Khớp tại Việt Nam:\n\n- Các chuyên gia có quá trình đào tạo bài bản, nhiều kinh nghiệm\n- Các giáo sư, phó giáo sư đang trực tiếp nghiên cứu và giảng dạy tại Đại học Y khoa Hà Nội\n- Các bác sĩ đã, đang công tác tại các bệnh viện hàng đầu Khoa Cơ Xương Khớp - Bệnh viện Bạch Mai, Bệnh viện Hữu nghị Việt Đức,Bệnh Viện E.\n- Là thành viên hoặc lãnh đạo các tổ chức chuyên môn như: Hiệp hội Cơ Xương Khớp, Hội Thấp khớp học,...\n- Được nhà nước công nhận các danh hiệu Thầy thuốc Nhân dân, Thầy thuốc Ưu tú, Bác sĩ Cao cấp,...\n\n**Bệnh Cơ Xương Khớp**\n\n- Gout\n- Thoái hóa khớp: khớp gối, cột sống thắt lưng, cột sống cổ\n- Viêm khớp dạng thấp, Viêm đa khớp, Viêm gân\n- Tràn dịch khớp gối, Tràn dịch khớp háng, Tràn dịch khớp khủy, Tràn dịch khớp vai\n- Loãng xương, đau nhức xương\n- Viêm xương, gai xương\n- Viêm cơ, Teo cơ, chứng đau mỏi cơ\n- Yếu cơ, Loạn dưỡng cơ\n- Các chấn thương về cơ, xương, khớp\n- **...**"}]

                                                        # 1. XỬ LÝ SPECIALTY

# Hàm trả về true false, dựa trên tiêu đề specialty header, Specialty header: Markdown level 2 (##)
def is_specialty_header(line: str) -> bool:
    return line.strip().startswith("## ") and not line.strip().startswith("### ") # chỉ lấy level 2 không lấy level 3 trở đi
# Hàm trả về true false, dựa trên tiêu đề section header, Section header: Markdown level 3 (###)
def is_section_header(line: str) -> bool: 
    return line.strip().startswith("### ")
# Hàm nhận diện section có ngữ nghĩa dựa trên từ khóa
SECTION_ENUM = {
    "doctor": ["bác sĩ", "chuyên gia"],
    "disease": ["bệnh", "bệnh lý"], # bệnh
    "treatment": ["điều trị", "phẫu thuật"], 
    "consulting": ["tư vấn"],
    "service": ["dịch vụ", "kỹ thuật", "nội soi", "chụp"],
    "examination": ["khám"], # kiểm tra
    "overview": ["giới thiệu", "tổng quan"],
}
def detect_section(header: str) -> str:
    h = header.lower()
    for section, keywords in SECTION_ENUM.items():
        if any(k in h for k in keywords):
            return section
    return "other"

# Hàm chunk string, một object dựa trên header và section
def chunk_specialty_markdown(markdown: str, specialty_id: int, markdown_id: int): # contentMarkdown, idSpecialty, idMarkdown
    lines = [l.rstrip() for l in markdown.split("\n")] # Xóa khoảng trắng bên phải, cắt dòng

    chunks = []
    current_specialty = None
    current_section = None
    buffer = []
    chunk_index = 1

    for line in lines:
        line = line.strip()
        if not line: # nếu dòng rỗng, if line == ""
            continue # bỏ qua toàn bộ phần code còn lại trong vòng lặp cho dòng này. (bỏ qua các dòng trống)

        # --- Specialty header (##) ---
        if is_specialty_header(line): # nếu là tiêu đề chuyên khoa thì xử lý rồi chuyển sang vòng lặp tiếp theo
            current_specialty = line.replace("##", "").strip()
            current_section = None
            buffer = []
            continue

        # --- Section header (###) ---
        if is_section_header(line): # nếu là tiêu đề section thì xử lý
            # thêm chunk vào chunks nếu buffer không rỗng
            if buffer and current_specialty and current_section: # nếu buffer không rỗng và có chuyên khoa và có section
                chunks.append({
                    "id": f"md_{markdown_id}_chunk_{chunk_index}",
                    "text": (
                        f"Chuyên khoa {current_specialty} – "
                        f"{current_section}\n{''.join(buffer)}"
                    ),
                    "metadata": {
                        "entity": "specialty",
                        "specialtyId": specialty_id,
                        "specialtyName": current_specialty,
                        "section": current_section,
                        "markdownId": markdown_id,
                        # "language": "vi"
                    }
                })
                chunk_index += 1

            current_section = detect_section(line.replace("###", "").strip())
            buffer = []
            continue

        # --- Content ---
        buffer.append(line + "\n") # Thêm dòng thường (nếu không phải ## và ###) vào buffer

    # thêm chunk vào chunks cuối cùng nếu còn dữ liệu trong buffer
    if buffer and current_specialty and current_section:
        chunks.append({
            "id": f"md_{markdown_id}_chunk_{chunk_index}",
            "text": (
                f"Chuyên khoa {current_specialty} – "
                f"{current_section}\n{''.join(buffer)}"
            ),
            "metadata": {
                "entity": "specialty",
                "specialtyId": specialty_id,
                "specialtyName": current_specialty,
                "section": current_section,
                "markdownId": markdown_id,
                # "language": "vi"
            }
        })

    return chunks

all_chunks = [] # Danh sách lưu trữ tất cả các chunk của specialty và doctor markdown

# Chunk danh sách: Sử dụng hàm chunk string cho từng object markdown trong list markdown lấy từ API, và dùng hàm
for md in markdown_list_response:
    chunks = chunk_specialty_markdown(
        markdown=md["contentMarkdown"],
        specialty_id=md["specialtyId"],
        markdown_id=md["id"]
    )
    all_chunks.extend(chunks)

# print(f"chunks tạo được: {(all_chunks)}") #[{'id': 'md_2_chunk_1', 'text': 'Chuyên khoa **Cơ Xương Khớp** – doctor\nDanh sách các bác sĩ uy tín đầu ngành Cơ Xương Khớp tại Việt Nam:\n- Các chuyên gia có quá trình đào tạo bài bản, nhiều kinh nghiệm\n- Các giáo sư, phó giáo sư đang trực tiếp nghiên cứu và giảng dạy tại Đại học Y khoa Hà Nội\n- Các bác sĩ đã, đang công tác tại các bệnh viện hàng đầu Khoa Cơ Xương Khớp - Bệnh viện Bạch Mai, Bệnh viện Hữu nghị Việt Đức,Bệnh Viện E.\n- Là thành viên hoặc lãnh đạo các tổ chức chuyên môn như: Hiệp hội Cơ Xương Khớp, Hội Thấp khớp học,...\n- Được nhà nước công nhận các danh hiệu Thầy thuốc Nhân dân, Thầy thuốc Ưu tú, Bác sĩ Cao cấp,...\n', 'metadata': {'entity': 'specialty', 'specialtyId': 2, 'specialtyName': '**Cơ Xương Khớp**', 'section': 'doctor', 'markdownId': 2}}, {'id': 'md_2_chunk_2', 'text': 'Chuyên khoa **Cơ Xương Khớp** – disease\n- Gout\n- Thoái hóa khớp: khớp gối, cột sống thắt lưng, cột sống cổ\n- Viêm khớp dạng thấp, Viêm đa khớp, Viêm gân\n- Tràn dịch khớp gối, Tràn dịch khớp háng, Tràn dịch khớp khủy, Tràn dịch khớp vai\n- Loãng xương, đau nhức xương\n- Viêm xương, gai xương\n- Viêm cơ, Teo cơ, chứng đau mỏi cơ\n- Yếu cơ, Loạn dưỡng cơ\n- Các chấn thương về cơ, xương, khớp\n- ...\n', 'metadata': {'entity': 'specialty', 'specialtyId': 2, 'specialtyName': '**Cơ Xương Khớp**', 'section': 'disease', 'markdownId': 2}}, ...] || obj chunk có 3 trường: id, text, metadata


                                                        # 2. XỬ LÝ DOCTOR

# i. Mapping từ khóa sang ngữ nghĩa cho Bác sĩ
DOCTOR_SECTION_ENUM = {
    "treatment": ["khám", "điều trị", "bệnh lý", "chuyên trị"],
    "experience": ["công tác", "kinh nghiệm", "làm việc"],
    "education": ["đào tạo", "tốt nghiệp", "học vấn"],
    "certificate": ["chứng chỉ", "hội viên"],
    "award": ["khen thưởng", "danh hiệu"],
    "research": ["nghiên cứu", "bài báo"],
    "overview": ["giới thiệu", "tóm tắt"] # Dành cho phần text nằm ngay dưới tên bác sĩ
}

def detect_doctor_section(header: str) -> str:
    h = header.lower()
    for section, keywords in DOCTOR_SECTION_ENUM.items():
        if any(k in h for k in keywords):
            return section
    return "other"

# ii. Hàm chunk markdown bác sĩ
def chunk_doctor_markdown(markdown: str, doctor_id: int, doctor_name_from_db: str, specialty_name: str, markdown_id: int, description: str = ""):
    lines = [l.rstrip() for l in markdown.split("\n")]
    
    chunks = []
    current_doctor_name = doctor_name_from_db # Mặc định lấy từ DB
    current_section = None
    buffer = []
    chunk_index = 1

    for line in lines:
        line = line.strip()
        if not line: continue

        # --- Case 1: Doctor Name Header (##) ---
        # Ví dụ: ## **Bác sĩ Chuyên khoa II Phạm Quốc Huy**
        if line.startswith("## ") and not line.startswith("### "):
            # 1. Nếu trước đó đang gom dở dữ liệu của section cũ -> Lưu lại
            if buffer and current_section:
                chunks.append(create_doctor_chunk(markdown_id, chunk_index, doctor_id, current_doctor_name, specialty_name, current_section, buffer))
                chunk_index += 1
            
            # 2. Reset cho bác sĩ mới (trong trường hợp 1 file markdown có nhiều bác sĩ, dù hiếm)
            # Làm sạch chuỗi: bỏ ##, bỏ **, bỏ khoảng trắng dư
            clean_name = line.replace("##", "").replace("**", "").strip()
            if clean_name: 
                current_doctor_name = clean_name
            
            # 3. Quan trọng: Set ngay section mặc định là 'overview' 
            # để hứng các dòng text giới thiệu ngay bên dưới
            current_section = "overview" 
            buffer = []
            # Ta nạp ngay description vào đầu buffer rỗng -> điều này đảm bảo chunk đầu tiên luôn chứa phần tóm tắt đắt giá nhất
            if description: 
                buffer.append(f"Tóm tắt tiểu sử: {description}")

            continue

        # --- Case 2: Section Header (###) ---
        # Ví dụ: ### **Khám và điều trị**
        if line.startswith("### "):
            # 1. Lưu section trước đó (ví dụ lưu phần overview hoặc phần công tác trước đó)
            if buffer and current_section:
                chunks.append(create_doctor_chunk(markdown_id, chunk_index, doctor_id, current_doctor_name, specialty_name, current_section, buffer))
                chunk_index += 1

            # 2. Bắt đầu section mới
            clean_header = line.replace("###", "").replace("**", "").strip()
            current_section = detect_doctor_section(clean_header)
            # Mẹo: Thêm luôn cái Header gốc vào buffer để AI đọc hiểu ngữ cảnh tốt hơn
            # VD: buffer = ["Khám và điều trị:"]
            buffer = [f"{clean_header}:"] 
            continue

        # --- Case 3: Content Lines ---
        # Nếu chưa gặp Header nào mà đã có text, mặc định gán vào overview
        if current_section is None:
            current_section = "overview"
            # Nếu file markdown không có tiêu đề ## ở đầu, ta cũng nạp description vào đây
            if not buffer and description:
                 buffer.append(f"Tóm tắt tiểu sử: {description}")

        buffer.append(line)

    # --- End Loop: Lưu phần còn lại trong buffer ---
    if buffer and current_section:
        chunks.append(create_doctor_chunk(markdown_id, chunk_index, doctor_id, current_doctor_name, specialty_name, current_section, buffer))

    return chunks

# iii. Hàm phụ trợ để tạo object chunk thống nhất (Tránh lặp code)
def create_doctor_chunk(md_id, idx, doc_id, doc_name, spec_name, section, buffer_list):
    # Tạo nội dung ngữ nghĩa cao
    # Ví dụ: "Bác sĩ Phạm Quốc Huy (Cơ Xương Khớp) - overview: \n Hơn 30 năm kinh nghiệm..."
    text_content = (
        f"Thông tin Bác sĩ {doc_name} (Chuyên khoa {spec_name}) – Mục {section}:\n"
        f"{'\n'.join(buffer_list)}"
    )
    
    return {
        "id": f"md_doc_{md_id}_chunk_{idx}",
        "text": text_content,
        "metadata": {
            "entity": "doctor",
            "doctorId": doc_id,
            "doctorName": doc_name,
            "specialtyName": spec_name,
            "section": section,
            "markdownId": md_id
        }
    }

# iv(buoc dung cac định nghĩa hàm trên xử lý kết quả lấy từ API). Lấy doctor_list_response trả về từ API
for doc in doctor_list_response:
    doc_chunks = chunk_doctor_markdown(
        markdown=doc["contentMarkdown"],
        doctor_id=doc["doctorId"],
        doctor_name_from_db=doc["doctorName"], # Dùng tên từ DB làm chuẩn
        specialty_name=doc["specialtyName"],
        markdown_id=doc["id"],
        description=doc["description"]
    )
    all_chunks.extend(doc_chunks)

                                                        # 3. TẠO DOCUMENT VÀ NẠP VÀO CHROMADB

# Hàm chuyển đổi chunks thành Document của LangChain
from langchain_core.documents import Document
def ChangeChunksToLangChainDocument(chunks):
    documents = []
    for chunk in chunks:
        doc = Document(
            page_content=chunk["text"],
            metadata=chunk["metadata"]
        )
        documents.append(doc)
    return documents

specialty_doctor_markdown_Document = ChangeChunksToLangChainDocument(all_chunks)
# print(f"specialty_markdown_Document tạo được: {specialty_markdown_Document}") # output: [Document(metadata={'entity': 'specialty', 'specialtyId': 2, 'specialtyName': '**Cơ Xương Khớp**', 'section': 'doctor', 'markdownId': 2}, page_content='Chuyên khoa **Cơ Xương Khớp** – doctor\nDanh sách các bác sĩ uy tín đầu ngành Cơ Xương Khớp tại Việt Nam:\n- Các chuyên gia có quá trình đào tạo bài bản, nhiều kinh nghiệm\n- Các giáo sư, phó giáo sư đang trực tiếp nghiên cứu và giảng dạy tại Đại học Y khoa Hà Nội\n- Các bác sĩ đã, đang công tác tại các bệnh viện hàng đầu Khoa Cơ Xương Khớp - Bệnh viện Bạch Mai, Bệnh viện Hữu nghị Việt Đức,Bệnh Viện E.\n- Là thành viên hoặc lãnh đạo các tổ chức chuyên môn như: Hiệp hội Cơ Xương Khớp, Hội Thấp khớp học,...\n- Được nhà nước công nhận các danh hiệu Thầy thuốc Nhân dân, Thầy thuốc Ưu tú, Bác sĩ Cao cấp,...\n'), Document(metadata={'entity': 'specialty', 'specialtyId': 2, 'specialtyName': '**Cơ Xương Khớp**', 'section': 'disease', 'markdownId': 2}, page_content='Chuyên khoa **Cơ Xương Khớp** – disease\n- Gout\n- Thoái hóa khớp: khớp gối, cột sống thắt lưng, cột sống cổ\n- Viêm khớp dạng thấp, Viêm đa khớp, Viêm gân\n- Tràn dịch khớp gối, Tràn dịch khớp háng, Tràn dịch khớp khủy, Tràn dịch khớp vai\n- Loãng xương, đau nhức xương\n- Viêm xương, gai xương\n- Viêm cơ, Teo cơ, chứng đau mỏi cơ\n- Yếu cơ, Loạn dưỡng cơ\n- Các chấn thương về cơ, xương, khớp\n- ...\n'), Document(metadata={'entity': 'specialty', 'specialtyId': 3, 'specialtyName': '**Thần kinh**', 'section': 'doctor', 'markdownId': 3}, page_content='Chuyên khoa **Thần kinh** – doctor\nDanh sách các giáo sư, bác sĩ chuyên khoa Thần kinh giỏi:\n- Các giáo sư, bác sĩ uy tín đầu ngành chuyên khoa Thần kinh đã và đang công tác tại các bệnh viện lớn như: Bệnh viện Bạch Mai, Bệnh viện Việt Đức, Bệnh viện 108, Bệnh viện Đại học Y Hà Nội, Bệnh viện 103.\n- Là thành viên hoặc lãnh đạo các tổ chức chuyên môn như: Hội Thần kinh Việt Nam, Hội Phẫu thuật Thần kinh...\n- Được nhà nước công nhận các danh hiệu Thầy thuốc nhân dân, thầy thuốc ưu tú, bác sĩ cao cấp.\n'), ...] || [Document(metadata={...}, page_content="..."), Document(metadata={...}, page_content="..."), ...]

# Thêm dữ liệuvào ChromaDB
# Khởi tạo ChromaDB 
chromadb = Chroma(
    collection_name="specialty_markdown_langchain_collection",
    persist_directory="data/collections/all_specialty_markdown_langchain", 
    embedding_function=openai_ef)
ids = [chunk["id"] for chunk in all_chunks] # id cho vector
if chromadb._collection.count() == 0:
    chromadb.add_documents( # (Nếu đã thêm thì ẩn dòng này để tránh re-embedding)Thêm danh sách dữ liệu markdown specialty đã chunk và danh sách id vào ChromaDB 
        documents=specialty_doctor_markdown_Document,
        ids=ids
    )
# chromadb.add_documents( # (Nếu đã thêm thì ẩn dòng này để tránh re-embedding)Thêm danh sách dữ liệu markdown specialty đã chunk và danh sách id vào ChromaDB 
#         documents=specialty_doctor_markdown_Document,
#         ids=ids
# )
def generate_multi_query(query, model="gpt-3.5-turbo"):
    prompt = """
    Bạn là một trợ lý tóm tắt thông tin chuyên khoa, bác sĩ của hệ thống đặt lịch khám.
    Người dùng của bạn đang hỏi về thông tin của các chuyên khoa hoặc bác sĩ.
    Đối với câu hỏi được đưa ra, hãy đề xuất tối đa ba câu hỏi liên quan để hỗ trợ họ tìm kiếm thông tin họ cần.
    Hãy cung cấp các câu hỏi ngắn gọn, tập trung vào một chủ đề bao quát các khía cạnh khác nhau của chủ đề.
    Đảm bảo mỗi câu hỏi đều đầy đủ và liên quan trực tiếp đến câu hỏi ban đầu.
    Liệt kê mỗi câu hỏi trên một dòng riêng biệt, không đánh số.
                """
    messages = [
        {
            "role": "system",
            "content": prompt,
        },
        {   "role": "user",
            "content": query
        },
    ]
    response = client.chat.completions.create(
        model=model,
        messages=messages,
    )
    content = response.choices[0].message.content
    content = content.split("\n")
    return content

def generate_response(question, relevant_chunks): 
    context = "\n\n".join(relevant_chunks) # Nối n_results đoạn kết quả thành một chuỗi ngữ cảnh lớn cách nhau bởi 2 dòng trống \n\n
    prompt = f"""
        Bạn là Trợ lý AI của nền tảng y tế đặt lịch khám.Hỗ trợ tư vấn các thông tin cần thiết như bác sĩ và chuyên khoa liên quan đến hệ thống đặt lịch khám cho người cần khám bệnh dựa trên thông tin NGỮ CẢNH bên dưới.

        NHIỆM VỤ:
        1. Xác định vấn đề sức khỏe của người dùng dựa trên NGỮ CẢNH.
        2. Đề xuất CHUYÊN KHOA phù hợp.
        3. QUAN TRỌNG: Dựa vào danh sách [DOCTOR] trong ngữ cảnh, hãy ĐỀ XUẤT CỤ THỂ 2-3 BÁC SĨ phù hợp nhất với chuyên khoa đó.
        4. Cung cấp lý do ngắn gọn tại sao chọn bác sĩ đó (ví dụ: số năm kinh nghiệm, thế mạnh).

        Nếu bạn không biết câu trả lời hoặc không chắc chắn về câu trả lời, chỉ cần nói rằng bạn không biết, đừng cố gắng bịa ra câu trả lời.

        NGỮ CẢNH: {context}

        CÂU HỎI: {question}
        """
    response = client.chat.completions.create( # Hàm tạo câu trả lời từ LLM
        model="gpt-4o-mini",
        messages=[
            {
                "role": "user",
                "content": prompt,
            },
        ],
    )
    final_answer = response.choices[0].message.content
    return final_answer

def rag_pipeline(query): # dự đoán đầu ra là -> tuple[str, list[Document]]:
    aug_queries= generate_multi_query(query) # tạo thêm câu hỏi tăng cường dựa vào câu hỏi gốc
    joint_query = [ query ] + aug_queries # mảng kết hợp cả câu hỏi gốc và các câu hỏi tăng cường

    all_results = [chromadb.similarity_search(q, k=6) for q in joint_query] # return List[List[Document]]
    # output định dạng: 
    # all_results = [
    #     [Doc_1_câu_1, Doc_2_câu_1, Doc_3_câu_1], # Kết quả của q1
    #     [Doc_1_câu_2, Doc_2_câu_2, Doc_3_câu_2], # Kết quả của q2
    #     [Doc_1_câu_3, Doc_2_câu_3, Doc_3_câu_3]  # Kết quả của q3
    # ]
    # Lưu ý: khi dùng .similarity_search(q, k=6) thì trả về 6 doc tương tự nhất, nhưng khi người dùng hỏi cả bác sĩ và chuyên khoa thì nếu k thấp
    #các kết quả trả về có thể chỉ tập trung vào 1 trong 2 loại (bác sĩ hoặc chuyên khoa) mà bỏ sót loại còn lại.

    # retrieved_documents = []
    # for doc_list in all_results:
    #     retrieved_documents.extend(doc_list) # nối mảng - nối tất cả các chunk - câu trả lời thành một MẢNG lớn

    # 1. Thu thập tất cả nội dung và dùng set để loại bỏ trùng lặp
    unique_contents = set()
    for doc_list in all_results:
        for doc in doc_list:
                # doc là đối tượng Document, ta lấy thuộc tính page_content
            unique_contents.add(doc.page_content)
    
        # 2. Chuyển thành một chuỗi văn bản duy nhất (Context) để đưa vào LLM
    retrieved_context = list(unique_contents)

        # 3. Gửi cho LLM
        # Lưu ý: generate_response của bạn nên nhận vào chuỗi context này
    answer = generate_response(query, retrieved_context)

    # answer = generate_response(query, retrieved_documents)
    return answer