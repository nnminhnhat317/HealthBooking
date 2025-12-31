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
res = requests.get("http://localhost:8080/markdown/specialty")
markdown_list_response = res.json() #output: [{"id":2,"doctorId":null,"clinicId":null,"specialtyId":2,"contentMarkdown":"## **Cơ Xương Khớp**\n\n**Bác sĩ Cơ Xương Khớp giỏi**\n\nDanh sách các bác sĩ uy tín đầu ngành Cơ Xương Khớp tại Việt Nam:\n\n- Các chuyên gia có quá trình đào tạo bài bản, nhiều kinh nghiệm\n- Các giáo sư, phó giáo sư đang trực tiếp nghiên cứu và giảng dạy tại Đại học Y khoa Hà Nội\n- Các bác sĩ đã, đang công tác tại các bệnh viện hàng đầu Khoa Cơ Xương Khớp - Bệnh viện Bạch Mai, Bệnh viện Hữu nghị Việt Đức,Bệnh Viện E.\n- Là thành viên hoặc lãnh đạo các tổ chức chuyên môn như: Hiệp hội Cơ Xương Khớp, Hội Thấp khớp học,...\n- Được nhà nước công nhận các danh hiệu Thầy thuốc Nhân dân, Thầy thuốc Ưu tú, Bác sĩ Cao cấp,...\n\n**Bệnh Cơ Xương Khớp**\n\n- Gout\n- Thoái hóa khớp: khớp gối, cột sống thắt lưng, cột sống cổ\n- Viêm khớp dạng thấp, Viêm đa khớp, Viêm gân\n- Tràn dịch khớp gối, Tràn dịch khớp háng, Tràn dịch khớp khủy, Tràn dịch khớp vai\n- Loãng xương, đau nhức xương\n- Viêm xương, gai xương\n- Viêm cơ, Teo cơ, chứng đau mỏi cơ\n- Yếu cơ, Loạn dưỡng cơ\n- Các chấn thương về cơ, xương, khớp\n- **...**"}]

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

# Chunk danh sách: Sử dụng hàm chunk string cho từng object markdown trong list markdown lấy từ API
all_chunks = []
for md in markdown_list_response:
    chunks = chunk_specialty_markdown(
        markdown=md["contentMarkdown"],
        specialty_id=md["specialtyId"],
        markdown_id=md["id"]
    )
    all_chunks.extend(chunks)

# print(f"chunks tạo được: {(all_chunks)}") #[{'id': 'md_2_chunk_1', 'text': 'Chuyên khoa **Cơ Xương Khớp** – doctor\nDanh sách các bác sĩ uy tín đầu ngành Cơ Xương Khớp tại Việt Nam:\n- Các chuyên gia có quá trình đào tạo bài bản, nhiều kinh nghiệm\n- Các giáo sư, phó giáo sư đang trực tiếp nghiên cứu và giảng dạy tại Đại học Y khoa Hà Nội\n- Các bác sĩ đã, đang công tác tại các bệnh viện hàng đầu Khoa Cơ Xương Khớp - Bệnh viện Bạch Mai, Bệnh viện Hữu nghị Việt Đức,Bệnh Viện E.\n- Là thành viên hoặc lãnh đạo các tổ chức chuyên môn như: Hiệp hội Cơ Xương Khớp, Hội Thấp khớp học,...\n- Được nhà nước công nhận các danh hiệu Thầy thuốc Nhân dân, Thầy thuốc Ưu tú, Bác sĩ Cao cấp,...\n', 'metadata': {'entity': 'specialty', 'specialtyId': 2, 'specialtyName': '**Cơ Xương Khớp**', 'section': 'doctor', 'markdownId': 2}}, {'id': 'md_2_chunk_2', 'text': 'Chuyên khoa **Cơ Xương Khớp** – disease\n- Gout\n- Thoái hóa khớp: khớp gối, cột sống thắt lưng, cột sống cổ\n- Viêm khớp dạng thấp, Viêm đa khớp, Viêm gân\n- Tràn dịch khớp gối, Tràn dịch khớp háng, Tràn dịch khớp khủy, Tràn dịch khớp vai\n- Loãng xương, đau nhức xương\n- Viêm xương, gai xương\n- Viêm cơ, Teo cơ, chứng đau mỏi cơ\n- Yếu cơ, Loạn dưỡng cơ\n- Các chấn thương về cơ, xương, khớp\n- ...\n', 'metadata': {'entity': 'specialty', 'specialtyId': 2, 'specialtyName': '**Cơ Xương Khớp**', 'section': 'disease', 'markdownId': 2}}, ...] || obj chunk có 3 trường: id, text, metadata

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

specialty_markdown_Document = ChangeChunksToLangChainDocument(all_chunks)
# print(f"specialty_markdown_Document tạo được: {specialty_markdown_Document}") # output: [Document(metadata={'entity': 'specialty', 'specialtyId': 2, 'specialtyName': '**Cơ Xương Khớp**', 'section': 'doctor', 'markdownId': 2}, page_content='Chuyên khoa **Cơ Xương Khớp** – doctor\nDanh sách các bác sĩ uy tín đầu ngành Cơ Xương Khớp tại Việt Nam:\n- Các chuyên gia có quá trình đào tạo bài bản, nhiều kinh nghiệm\n- Các giáo sư, phó giáo sư đang trực tiếp nghiên cứu và giảng dạy tại Đại học Y khoa Hà Nội\n- Các bác sĩ đã, đang công tác tại các bệnh viện hàng đầu Khoa Cơ Xương Khớp - Bệnh viện Bạch Mai, Bệnh viện Hữu nghị Việt Đức,Bệnh Viện E.\n- Là thành viên hoặc lãnh đạo các tổ chức chuyên môn như: Hiệp hội Cơ Xương Khớp, Hội Thấp khớp học,...\n- Được nhà nước công nhận các danh hiệu Thầy thuốc Nhân dân, Thầy thuốc Ưu tú, Bác sĩ Cao cấp,...\n'), Document(metadata={'entity': 'specialty', 'specialtyId': 2, 'specialtyName': '**Cơ Xương Khớp**', 'section': 'disease', 'markdownId': 2}, page_content='Chuyên khoa **Cơ Xương Khớp** – disease\n- Gout\n- Thoái hóa khớp: khớp gối, cột sống thắt lưng, cột sống cổ\n- Viêm khớp dạng thấp, Viêm đa khớp, Viêm gân\n- Tràn dịch khớp gối, Tràn dịch khớp háng, Tràn dịch khớp khủy, Tràn dịch khớp vai\n- Loãng xương, đau nhức xương\n- Viêm xương, gai xương\n- Viêm cơ, Teo cơ, chứng đau mỏi cơ\n- Yếu cơ, Loạn dưỡng cơ\n- Các chấn thương về cơ, xương, khớp\n- ...\n'), Document(metadata={'entity': 'specialty', 'specialtyId': 3, 'specialtyName': '**Thần kinh**', 'section': 'doctor', 'markdownId': 3}, page_content='Chuyên khoa **Thần kinh** – doctor\nDanh sách các giáo sư, bác sĩ chuyên khoa Thần kinh giỏi:\n- Các giáo sư, bác sĩ uy tín đầu ngành chuyên khoa Thần kinh đã và đang công tác tại các bệnh viện lớn như: Bệnh viện Bạch Mai, Bệnh viện Việt Đức, Bệnh viện 108, Bệnh viện Đại học Y Hà Nội, Bệnh viện 103.\n- Là thành viên hoặc lãnh đạo các tổ chức chuyên môn như: Hội Thần kinh Việt Nam, Hội Phẫu thuật Thần kinh...\n- Được nhà nước công nhận các danh hiệu Thầy thuốc nhân dân, thầy thuốc ưu tú, bác sĩ cao cấp.\n'), ...] || [Document(metadata={...}, page_content="..."), Document(metadata={...}, page_content="..."), ...]

# Thêm dữ liệuvào ChromaDB
# Khởi tạo ChromaDB 
chromadb = Chroma(
    collection_name="specialty_markdown_langchain_collection",
    persist_directory="data/collections/all_specialty_markdown_langchain", 
    embedding_function=openai_ef)
ids = [chunk["id"] for chunk in all_chunks] # id cho vector
if chromadb._collection.count() == 0:
    chromadb.add_documents( # (Nếu đã thêm thì ẩn dữ liệu)Thêm danh sách dữ liệu markdown specialty đã chunk và danh sách id vào ChromaDB 
        documents=specialty_markdown_Document,
        ids=ids
    )

def generate_multi_query(query, model="gpt-3.5-turbo"):
    prompt = """
    Bạn là một trợ lý tóm tắt thông tin chuyên khoa của hệ thống đặt lịch khám am hiểu.
    Người dùng của bạn đang hỏi về thông tin của các chuyên khoa.
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
        Sử dụng NGỮ CẢNH sau đây để trả lời CÂU HỎI ở cuối.

        Nếu bạn không biết câu trả lời hoặc không chắc chắn về câu trả lời, chỉ cần nói rằng bạn không biết, đừng cố gắng bịa ra câu trả lời.

        Sử dụng giọng văn khách quan và mang tính báo chí.

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

    all_results = [chromadb.similarity_search(q, k=3) for q in joint_query] # return List[List[Document]]
    # output định dạng: 
    # all_results = [
    #     [Doc_1_câu_1, Doc_2_câu_1, Doc_3_câu_1], # Kết quả của q1
    #     [Doc_1_câu_2, Doc_2_câu_2, Doc_3_câu_2], # Kết quả của q2
    #     [Doc_1_câu_3, Doc_2_câu_3, Doc_3_câu_3]  # Kết quả của q3
    # ]

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