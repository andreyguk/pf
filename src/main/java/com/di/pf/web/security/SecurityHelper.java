/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.di.pf.web.security;

import com.di.pf.domain.Users;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpServletRequest;

/**
 *
 * @author avg
 */
public class SecurityHelper {

    static final String SESSION_ATTRIB_USER = "sessionuser";

    public static Users getSessionUser(HttpServletRequest request) {
        Users user = null;
        HttpSession session = request.getSession(true);
        Object obj = session.getAttribute(SESSION_ATTRIB_USER);

        if (obj != null && obj instanceof Users) {
            user = (Users) obj;
        }

        return user;
    }

}
