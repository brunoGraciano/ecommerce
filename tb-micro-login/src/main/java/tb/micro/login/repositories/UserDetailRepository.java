package tb.micro.login.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tb.micro.login.entities.User;

import java.util.Optional;

public interface UserDetailRepository extends JpaRepository<User, String> {
    Optional<User> findByUsername(String username);
}
