import { useEffect, useState } from 'react';
import axios from 'axios';
import { getSpecialtyMarkdownApi } from '@/api/markdown';

export function TestPage() {

// const AvatarUpload = () => {
//   }; 

  const [file, setFile] = useState(null);

    const handleFileChange = (e:any) => {
        setFile(e.target.files[0]);
    };
  
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        if (!file) {
            alert("Please select a file");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('/users/upload-avatar', formData, {
                baseURL: 'http://localhost:8080',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log("Avatar uploaded:", response.data);
        } catch (error) {
            console.error("Error uploading avatar:", error);
        }
    };
    const getMarkdown = async () => {
        try {
          // Gọi API để lấy dữ liệu markdown
          const dataMDspecialty = await getSpecialtyMarkdownApi();
          console.log("data markdown in TestPage", dataMDspecialty);
        } catch (error) {
          console.error("Lỗi khi tải dữ liệu markdown DetailDoctor:", error);
        }
      };
    useEffect(() => {
        getMarkdown();
      }, []);
    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Upload Avatar</button>
        </form>
    );



}
