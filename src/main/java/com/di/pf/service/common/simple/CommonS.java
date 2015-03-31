/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.di.pf.service.common.simple;

import com.di.pf.dto.vo.Result;
import com.di.pf.dto.vo.ResultFactory;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import com.di.pf.dao.common.simple.CommonDImpl;

@Transactional
@Service("CommonS")
public class CommonS<T> {

    @Autowired
    protected CommonDImpl CommonDImpl;

    @Transactional(readOnly = false, propagation = Propagation.REQUIRED)

    public Result<List> getSimpleData(String className, Integer start, Integer limit, String name) {
        return ResultFactory.getSuccessResult(CommonDImpl.getSimpleData(null, className, start, limit, name));
    }

}
