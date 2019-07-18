package tb.micro.login.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tb.micro.login.entities.Role;
import tb.micro.login.entities.User;
import tb.micro.login.exception.ConflictException;
import tb.micro.login.exception.NoContentException;
import tb.micro.login.exception.NotFoundException;
import tb.micro.login.repositories.RoleDetailRepository;
import tb.micro.login.repositories.UserDetailRepository;

import java.net.URI;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RestController
@EnableResourceServer
@CrossOrigin
public class UserController {

    @Autowired
    private UserDetailRepository userDetailRepository;

    @Autowired
    private RoleDetailRepository roleDetailRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // PUBLIC
    // Post a user (Default role User)
    @PostMapping("/users")
    public ResponseEntity createUser(@RequestBody User user) {
        if (userDetailRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new ConflictException("Username " + user.getUsername() + " already exists. Please use a different username.");
        }
        User savedUser = new User(user);
        savedUser.setPassword(passwordEncoder.encode(user.getPassword()));
        Optional<Role> role = roleDetailRepository.findByName("ROLE_USER");
        List<Role> roleList = new ArrayList<>();
        role.ifPresent(r -> roleList.add(r));
        if (!roleList.isEmpty()) {
            savedUser.setRoles(roleList);
        }
        userDetailRepository.save(savedUser);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(savedUser.getId()).toUri();
        return ResponseEntity.created(location).build();
    }

    // ADMIN
    // Retrieve all users
    @GetMapping("/secure/users")
    @Secured("ROLE_ADMIN")
    public List<User> getAllUsers() {
        List<User> users = new ArrayList<>();
        userDetailRepository.findAll().forEach(users::add);
        if (users.isEmpty()) {
            throw new NoContentException("");
        }
        return users;
    }

    // Retrieve user by Id
    @GetMapping("/secure/users/{id}")
    @Secured("ROLE_ADMIN")
    public User getUserAdmin(@PathVariable String id) {
        Optional<User> result = userDetailRepository.findById(id);
        User user = null;
        if (result.isPresent()) {
            user = result.get();
        } else {
            throw new NotFoundException("id- " + id);
        }
        return user;
    }

    // Delete user by Id
    @DeleteMapping("/secure/users/{id}")
    public void deleteUserAdmin(@PathVariable String id) {
        if (!userDetailRepository.findById(id).isPresent()) {
            throw new NotFoundException("id- " + id);
        } else {
            userDetailRepository.deleteById(id);
        }
    }

    // Update User by Id

    @PutMapping("/secure/users/{id}")
    @Secured("ROLE_ADMIN")
    public void updateUserAdmin(@RequestBody User userBody, @PathVariable String id) {
        Optional<User> result = userDetailRepository.findById(id);
        if (!result.isPresent()) {
            throw new NotFoundException("User Not Found");
        }
        if (!userBody.getUsername().equals(result.get().getUsername())) {
            if (userDetailRepository.findByUsername(userBody.getUsername()).isPresent()) {
                throw new ConflictException("username- " + userBody.getUsername());
            }
        }
        userBody.setId(id);
        userBody.setPassword(result.get().getPassword());
        userDetailRepository.save(userBody);
    }

    // USER
    // Retrieve authenticated user
    @GetMapping("/private/users")
    @Secured("IS_AUTHENTICATED_FULLY")
    public User getUser(Principal principal) {
        Optional<User> result = userDetailRepository.findByUsername(principal.getName());
        User user;
        if (result.isPresent()) {
            user = result.get();
        } else {
            throw new NotFoundException("User Not Found");
        }
        return user;
    }

    // Updates authenticated user (can't update Role)
    @PutMapping("/private/users")
    @Secured("IS_AUTHENTICATED_FULLY")
    public void updateUser(@RequestBody User userBody, Principal principal) {
        Optional<User> result = userDetailRepository.findByUsername(principal.getName());
        if (!result.isPresent()) {
            throw new NotFoundException("User Not Found");
        }
        if (!userBody.getUsername().equals(principal.getName())) {
            if (userDetailRepository.findByUsername(userBody.getUsername()).isPresent()) {
                throw new ConflictException("username- " + userBody.getUsername());
            }
        }
        userBody.setId(result.get().getId());
        userBody.setRoles(result.get().getRoles());
        if (!userBody.getPassword().equals(result.get().getPassword())) {
            userBody.setPassword(passwordEncoder.encode(userBody.getPassword()));
        }
        userDetailRepository.save(userBody);
    }

    // Delete authenticated user
    @DeleteMapping("/private/users")
    @Secured("IS_AUTHENTICATED_FULLY")
    public void deleteUser(Principal principal) {
        Optional<User> result = userDetailRepository.findByUsername(principal.getName());
        if (result.isPresent()) {
            userDetailRepository.deleteById(result.get().getId());
        } else {
            throw new NotFoundException("User Not Found");
        }
    }
}
