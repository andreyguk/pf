/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.di.pf.web.handler;

import com.di.pf.domain.common.Territory;
import com.di.pf.domain.common.*;
import com.di.pf.domain.*;
import com.di.pf.domain.Users;
import com.di.pf.service.common.simple.CommonService;

import com.di.pf.dto.vo.Result;
import static com.di.pf.web.security.SecurityHelper.getSessionUser;

import java.util.List;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestParam;
import com.di.pf.service.common.simple.CommonS;

@Controller
@RequestMapping("/common/simple")
public class SimpleCommonHandler extends AbstractHandler {

    @Autowired
    protected CommonService commonService;
    protected CommonS commonS;

    @RequestMapping(value = "/findAll", method = RequestMethod.POST, produces = {"application/json; charset=UTF-8"})
    @ResponseBody
    public String findAll(HttpServletRequest request) {

        String name = "";

        if (request.getParameter("filter") != null) {
            JsonObject filter = parseJsonObject(request.getParameter("filter"));
            name = filter.getString("name");
        }

        String username = getSessionUser(request).getUsername();
        logger.debug("username=" + username);
        Integer start = Integer.parseInt(request.getParameter("start"));
        Integer limit = Integer.parseInt(request.getParameter("limit"));
        String classname = request.getParameter("classname");
        logger.debug("classname=" + classname);
        //Result<List<?>> ar = commonS.getSimpleData(classname, start, limit, name);
        //return getJsonSuccessData(ar.getData(), ar.getCount());
        switch (classname) {
         case "ApplicantType":
         return getApplicantType(username, start, limit, name);
         case "Territory":
         return getTerritory(username, start, limit, limit, name);
         case "UserRoles":
         return getUserRoles(username, start, limit, name);
         default:
         return null;
         }

    }

    public String getApplicantType(String username, Integer start, Integer limit, String name) {
        Result<List<ApplicantType>> ar = commonService.getApplicantType(username, start, limit, name);
        if (ar.isSuccess()) {
            return getJsonSuccessData(ar.getData(), ar.getCount());
        } else {
            return getJsonErrorMsg(ar.getMsg());
        }
    }

    public String getTerritory(String actionUser, Integer start, Integer limit, Integer id, String fullname) {
        Result<List<Territory>> ar = commonService.getTerritory(actionUser, start, limit, id, fullname);
        if (ar.isSuccess()) {
            return getJsonSuccessData(ar.getData(), ar.getCount());
        } else {
            return getJsonErrorMsg(ar.getMsg());
        }
    }

    public String getUserRoles(String username, Integer start, Integer limit, String name) {
        Result<List<Roles>> ar = commonService.getUserRoles(username, start, limit, name);
        if (ar.isSuccess()) {
            return getJsonSuccessData(ar.getData(), ar.getCount());
        } else {
            return getJsonErrorMsg(ar.getMsg());
        }
    }

}
