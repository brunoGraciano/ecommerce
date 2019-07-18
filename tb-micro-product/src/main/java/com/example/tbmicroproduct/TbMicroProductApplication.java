package com.example.tbmicroproduct;

import com.example.tbmicroproduct.user.Role;
import com.example.tbmicroproduct.user.User;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@SpringBootApplication
public class TbMicroProductApplication {
    public static void main(String[] args) {
        SpringApplication.run(TbMicroProductApplication.class, args);
    }

    public static boolean isAdmin(String session) {
        RestTemplate restTemplate = new RestTemplate();
        User user = restTemplate.getForObject("http://localhost:8087/private/users?access_token=" + session, User.class);
        List<Role> roleList = user.getRoles();
        for (Role role : roleList) {
            if (role.getName().equals("ROLE_ADMIN")) {
                return true;
            }
        }
        return false;
    }
    public static boolean isAdmin() {
        return true;
    }
}

