package com.myproject.healthcare_booking.WebConfig;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// Câu hinh cho phep truy cap anh tinh~
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${image.upload.dir}")
    private String uploadDir;

    @Value("${image.public.path}")
    private String publicPath;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        registry.addResourceHandler(publicPath+ "/**") // đưuoòng dan~   API
                .addResourceLocations("file:" + uploadDir + "/");
    }
}

