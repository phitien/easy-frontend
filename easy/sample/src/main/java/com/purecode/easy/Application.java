package com.purecode.easy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.Environment;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Created by phitien on 7/12/16.
 */
@SpringBootApplication
public class Application extends WebMvcConfigurerAdapter {
    @Autowired
    private Environment env;

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String profile = this.env.getProperty("spring.profiles");
        profile = profile.isEmpty() || profile.equals("default") ? "dev" : profile;
        String staticDir = String.format("classpath:/%s/static/", profile);
        registry.addResourceHandler("/static/**")
                .addResourceLocations(staticDir);
    }
}
