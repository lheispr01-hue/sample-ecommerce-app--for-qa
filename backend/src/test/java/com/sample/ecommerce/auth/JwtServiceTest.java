package com.sample.ecommerce.auth;

import io.jsonwebtoken.JwtException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class JwtServiceTest {

    // Random per run; never a real key
    private static final String SECRET = java.util.UUID.randomUUID() + "-" + java.util.UUID.randomUUID();
    private static final long EXPIRATION_MS = 86_400_000L;

    private JwtService jwtService;

    @BeforeEach
    void setUp() {
        jwtService = new JwtService(SECRET, EXPIRATION_MS);
    }

    @Test
    void generateTokenIncludesSubjectAndUidClaim() {
        User user = new User();
        user.setId(42L);
        user.setUsername("ada");

        String token = jwtService.generateToken(user);

        assertThat(jwtService.extractUsername(token)).isEqualTo("ada");
        assertThat(jwtService.parse(token).get("uid", Long.class)).isEqualTo(42L);
    }

    @Test
    void parseTamperedTokenFails() {
        User user = new User();
        user.setId(1L);
        user.setUsername("demo");
        String token = jwtService.generateToken(user);
        String tampered = token.substring(0, token.length() - 4) + "xxxx";

        assertThatThrownBy(() -> jwtService.parse(tampered))
                .isInstanceOf(JwtException.class);
    }
}
