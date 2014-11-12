/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.di.pf.service;

import com.di.pf.dao.UsersDAO;
import com.di.pf.domain.UserRoles;
import com.di.pf.domain.Users;
import com.di.pf.dto.vo.Result;
import com.di.pf.service.UsersService;
import java.util.List;
import static org.junit.Assert.assertTrue;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

/**
 *
 * @author avg
 */
public class UserServiceTest extends AbstractServiceTest {

    protected final String TEST_USERNAME = "test";
    @Autowired
    protected UsersService usersService;

    /**
     * Test case for the findAll() method of the CompanyService implementation
     *
     * @throws Exception
     */
    @Test
    public void testFindAll() throws Exception {

        logger.debug("\nSTARTED testFindAll()\n");
        int rowCount = countRowsInTable("main.organization");

        if (rowCount > 0) {

            Result<List<Users>> allItems = usersService.findAll(TEST_USERNAME, 0, 20);
            //assertTrue("Organization.findAll list not equal to row count of table ttt_company", rowCount == allItems.getData().size());

        } else {
            throw new IllegalStateException("INVALID TESTING SCENARIO: Company table is empty");
        }
        logger.debug("\nFINISHED testFindAll()\n");
    }

    @Test
    public void testUserRoles() throws Exception {

        logger.debug("\nSTARTED testUserRoles()\n");

        Result<List<UserRoles>> allItems = usersService.getUserRoles(1);
            //assertTrue("Organization.findAll list not equal to row count of table ttt_company", rowCount == allItems.getData().size());

        logger.debug("\nFINISHED testFindAll()\n"+ allItems.getData().size());
    }

}
