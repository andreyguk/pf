/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.di.pf.web.security;

import com.di.pf.web.handler.AbstractHandler;
import com.di.pf.domain.Users;
import com.di.pf.service.UsersService;
import com.di.pf.dto.vo.Result;
import static com.di.pf.web.handler.AbstractHandler.getJsonErrorMsg;
import static com.di.pf.web.security.SecurityHelper.SESSION_ATTRIB_USER;
import static com.di.pf.web.security.SecurityHelper.getSessionUser;
import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author avg
 */
@Controller
@RequestMapping("/security")
public class SecurityHandler extends AbstractHandler {

    @Autowired
    protected UsersService us;

    @RequestMapping(value = "/logon", method = RequestMethod.POST, produces = {"application/json"})
    @ResponseBody
    public void logon(HttpServletRequest request, HttpServletResponse response) throws IOException {

        String login = request.getParameter("login");
        String password = request.getParameter("password");
        String contextPath = request.getContextPath();
        Result<Users> ar = us.findByUsernamePassword(login, password);

        if (ar.isSuccess()) {
            Users user = ar.getData();
            HttpSession session = request.getSession(true);
            session.setAttribute(SESSION_ATTRIB_USER, user);
            response.sendRedirect(response.encodeRedirectURL("/index.html"));
            //return getJsonSuccessData(user);

        } else {
            response.sendRedirect(response.encodeRedirectURL("/index.html"));
            //return getJsonErrorMsg(ar.getMsg());

        }
    }

    @RequestMapping(value = "/checkauth", method = RequestMethod.POST, produces = {"application/json"})
    @ResponseBody
    public String checkauth(HttpServletRequest request) {

        Users user = getSessionUser(request);
        if (user != null) {
            return getJsonSuccessData(user);
        } else {
            return getJsonMsg("user not loggined", false);
        }
    }

    @RequestMapping(value = "/logout", produces = {"application/json"})
    @ResponseBody
    public String logout(HttpServletRequest request) {
        HttpSession session = request.getSession(true);
        session.removeAttribute(SESSION_ATTRIB_USER);
        return getJsonMsg("session is end", true);
    }
}
