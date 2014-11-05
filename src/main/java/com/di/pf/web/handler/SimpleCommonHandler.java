/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.di.pf.web.handler;

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

@Controller
@RequestMapping("/common/simple")
public class SimpleCommonHandler extends AbstractHandler {

    @Autowired
    protected CommonService commonService;

    @RequestMapping(value = "/findAll", method = RequestMethod.POST, produces = {"application/json; charset=UTF-8"})
    @ResponseBody
    public String findAll(HttpServletRequest request) {

        String username = getSessionUser(request).getUsername();
        Integer start = Integer.parseInt(request.getParameter("start"));
        Integer limit = Integer.parseInt(request.getParameter("limit"));
        String classname = request.getParameter("classname");

        switch (classname) {
            case "ApplicantType":
                return getApplicantType(username, start, limit);
            default:
                return null;
        }

    }

    public String getApplicantType(String username, Integer start, Integer limit) {
        Result<List<ApplicantType>> ar = commonService.getApplicantType(username, start, limit);
        if (ar.isSuccess()) {
            return getJsonSuccessData(ar.getData(), ar.getCount());
        } else {
            return getJsonErrorMsg(ar.getMsg());
        }
    }

}
