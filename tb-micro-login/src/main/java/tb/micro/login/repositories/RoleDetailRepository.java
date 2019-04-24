package tb.micro.login.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tb.micro.login.entities.Role;

import java.util.Optional;

public interface RoleDetailRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(String name);
}
