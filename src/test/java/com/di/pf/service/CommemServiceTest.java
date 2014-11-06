/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.di.pf.service;

import com.di.pf.dao.OrganizationDAO;
import com.di.pf.domain.common.ApplicantType;
import com.di.pf.dto.vo.Result;
import com.di.pf.service.common.simple.CommonService;
import java.util.List;
import static org.junit.Assert.assertTrue;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

/**
 *
 * @author avg
 */
public class CommemServiceTest extends AbstractServiceTest {

    protected final String TEST_USERNAME = "test";
    @Autowired
    protected CommonService commonService;

    @Test
    public void testFindAll() throws Exception {

        logger.debug("\nSTARTED testFindAll()\n");
        int rowCount = countRowsInTable("model.organization");

        if (rowCount > 0) {

            Result<List<ApplicantType>> allItems = commonService.getApplicantType(TEST_USERNAME, 0, 20,null);
            //assertTrue("Organization.findAll list not equal to row count of table ttt_company", rowCount == allItems.getData().size());

        } else {
            throw new IllegalStateException("INVALID TESTING SCENARIO: Company table is empty");
        }
        logger.debug("\nFINISHED testFindAll()\n");
    }

}
