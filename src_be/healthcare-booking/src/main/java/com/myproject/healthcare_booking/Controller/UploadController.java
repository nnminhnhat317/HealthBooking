package com.myproject.healthcare_booking.Controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/upload")
public class UploadController {

    @Value("${image.upload.dir}")
    private String uploadDir; //đường dẫn vật lý trên server
    @Value("${image.public.path}")
    private String publicPath;
    @PostMapping("/image")
    // ham tai anh len frontend
    public ResponseEntity<?> uploadImage(
            @RequestParam("file") MultipartFile file) throws IOException {

        String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
//        Path path = Paths.get(uploadDir + "/avatars/" + filename); // duong dan file
        Path path = Paths.get(uploadDir, filename);//
        Files.createDirectories(path.getParent());
        Files.write(path, file.getBytes());

//        String imageUrl = "/images/avatars/" + filename; // đường dẫn public cho frontend
        String imageUrl = publicPath + "/" + filename;
        return ResponseEntity.ok(imageUrl);
    }

    //ham (chuatest) dung chung cho ca user,clinic,specialty
//    public String saveImage(MultipartFile file) throws IOException {
//        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
//        Path path = Paths.get(uploadDir, filename);
//        Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
//        return publicPath + "/" + filename;
//    }
}

