package tb.micro.login.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import tb.micro.login.entities.AuthUserDetail;
import tb.micro.login.entities.User;
import tb.micro.login.repositories.UserDetailRepository;

import java.util.Optional;

@Service("userDetailsService")
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserDetailRepository userDetailRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {
        Optional<User> optionalUser = userDetailRepository.findByUsername(username);

        optionalUser.orElseThrow(() -> new UsernameNotFoundException("Username or password wrong"));

        return new AuthUserDetail(optionalUser.get());
    }

}
