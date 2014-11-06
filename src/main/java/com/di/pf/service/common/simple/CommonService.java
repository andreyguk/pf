/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.di.pf.service.common.simple;

import com.di.pf.dto.vo.Result;
import com.di.pf.domain.common.*;
import java.util.List;

/**
 *
 * @author avg
 */
public interface CommonService {

    public Result<List<ApplicantType>> getApplicantType(String actionUser,Integer start, Integer limit,String name);

    public Result<List<BuildingMainClass>> getBuildingMainClass(String actionUser,Integer start, Integer limit,String name);
}
