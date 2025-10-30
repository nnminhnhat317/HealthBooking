package com.myproject.healthcare_booking.JWTconfig;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class InterceptorConfig implements WebMvcConfigurer {

    private JwtInterceptor jwtInterceptor;
    public InterceptorConfig(JwtInterceptor jwtInterceptor) {
        this.jwtInterceptor = jwtInterceptor;
    }

    //Kiem tra JWT của request dua vao role user
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(jwtInterceptor)
                // -Xác thực JWT cho API cần bảo vệ (chỉ cần có token là truy cập đc)
                // -Còn để phân quyền role cụ thể thì cấu hình trong file JwtInterceptor
                .addPathPatterns("/.../...")
                // Không xác thưc JWT cho login
                .excludePathPatterns("/auth/**");
    }

}
