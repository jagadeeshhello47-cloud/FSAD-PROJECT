package com.fsad.backend.service;

import com.fsad.backend.entity.User;
import com.fsad.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public User registerUser(String userName, String password, String role) {
        if (userRepository.existsByUserName(userName)) {
            throw new RuntimeException("Username already exists");
        }
        
        User user = new User(userName, passwordEncoder.encode(password), role);
        return userRepository.save(user);
    }
    
    public Optional<User> login(String userName, String password) {
        Optional<User> userOpt = userRepository.findByUserName(userName);
        
        if (userOpt.isPresent() && passwordEncoder.matches(password, userOpt.get().getPassword())) {
            return userOpt;
        }
        
        return Optional.empty();
    }
    
    public Optional<User> findByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}