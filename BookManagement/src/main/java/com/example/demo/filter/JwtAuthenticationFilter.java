package com.example.demo.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import com.example.demo.util.JwtUtil;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String header = request.getHeader("Authorization");
        String token = null;
        String username = null;

        if (header != null && header.startsWith("Bearer ")) {
            token = header.substring(7);
            System.out.println("✅ JWT Token: " + token);
            try {
                username = jwtUtil.getUsernameFromToken(token);
                System.out.println("✅ Username from token: " + username);
            } catch (Exception e) {
                System.out.println("❌ Failed to parse JWT: " + e.getMessage());
            }
        } else {
            System.out.println("❌ Authorization header missing or invalid: " + header);
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            System.out.println("✅ Loaded user details: " + userDetails.getUsername());
            if (jwtUtil.validateToken(token)) {
                System.out.println("✅ Token is valid, setting authentication");
                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(
                                userDetails, null, userDetails.getAuthorities());
                auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(auth);
            } else {
                System.out.println("❌ Invalid token");
            }
        } else {
            System.out.println("❌ Username is null or already authenticated");
        }

        // ✅ VERY IMPORTANT: always call next filter
        filterChain.doFilter(request, response);
    }
}
