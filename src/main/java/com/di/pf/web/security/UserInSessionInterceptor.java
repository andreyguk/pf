/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.di.pf.web.security;

import com.di.pf.domain.Users;
import static com.di.pf.web.security.SecurityHelper.getSessionUser;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

/**
 *
 * @author avg
 */
public class UserInSessionInterceptor extends HandlerInterceptorAdapter {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {

        //response.setHeader("Content-Type", "application/json; charset=UTF-8");
        response.setContentType("application/json;charset=UTF-8;");
        response.setCharacterEncoding("UTF-8");
        

        Users sessionUser = getSessionUser(request);

        if (sessionUser == null) {
            String json = "{\"success\":false,\"type\":\"autologout\"}";
            response.getOutputStream().write(json.getBytes());
            //response.sendRedirect("security/login.html");
            return false;
        } else {

            return true;
        }
    }
}
