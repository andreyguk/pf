/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.di.pf.web.security;

import com.di.pf.web.handler.AbstractHandler;
import com.di.pf.domain.Users;
import com.di.pf.domain.UserRoles;
import com.di.pf.dto.vo.Result;
import com.di.pf.service.UsersService;
import static com.di.pf.web.security.SecurityHelper.SESSION_ATTRIB_USER;
import static com.di.pf.web.security.SecurityHelper.getSessionUser;
import java.io.IOException;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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

    @RequestMapping(value = "/logon", method = RequestMethod.POST, produces = {"application/json; charset=UTF-8"})
    @ResponseBody
    public void logon(HttpServletRequest request, HttpServletResponse response) throws IOException {

        String login = request.getParameter("login");
        String password = request.getParameter("password");
        logger.debug("login=" + login);
        Result<Users> ar = us.findByUsernamePassword(login, password);

        logger.debug("ar.isSuccess()=" + ar.isSuccess());
        if (ar.isSuccess()) {
            Users user = ar.getData();
            HttpSession session = request.getSession(true);
            session.setAttribute(SESSION_ATTRIB_USER, user);
            response.sendRedirect(response.encodeRedirectURL("/index.html"));
        } else {
            response.sendRedirect(response.encodeRedirectURL("/error.html"));

        }
    }

    @RequestMapping(value = "/checkauth", method = RequestMethod.POST, produces = {"application/json; charset=UTF-8"})
    @ResponseBody
    public String checkauth(HttpServletRequest request) {
        Users user = getSessionUser(request);
        //Result<List<UserRoles>> ar = us.getUserRoles(1);
        /*Result<List<UserRoles>> ar = us.getUserRoles(1);

        if (ar.isSuccess()) {
            //return getJsonSuccessData(ar.getData());
            return getJsonSuccessData(ar.getData());

        } else {

            return getJsonErrorMsg(ar.getMsg());

        }*/

        
        if (user != null) {
         return getJsonSuccessData(user);
         } else {
         return getJsonMsg("user not loggined", false);
         }
    }

    @RequestMapping(value = "/logout", produces = {"application/json; charset=UTF-8"})
    @ResponseBody
    public String logout(HttpServletRequest request) {
        HttpSession session = request.getSession(true);
        session.removeAttribute(SESSION_ATTRIB_USER);
        return getJsonMsg("session is end", true);
    }
}
