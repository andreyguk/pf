/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.di.pf.dao;

import java.util.List;
import static org.junit.Assert.assertTrue;
import org.junit.Test;
import com.di.pf.domain.Users;

/**
 *
 * @author avg
 */
public class UsersDAOTest extends AbstractDAOTest {

    public UsersDAOTest() {
    }

    @Test
    public void testFindAll() throws Exception {

        logger.debug("\nSTARTED testFindAll()\n");
        int rowCount = countRowsInTable("users");

        if (rowCount > 0) {

            List<Users> allItems = usersDAO.findAll();
            assertTrue("Company.findAll list not equal to row count of table ttt_company", rowCount == allItems.size());

        } else {
            throw new IllegalStateException("INVALID TESTING SCENARIO: Company table is empty");
        }
        logger.debug("\nFINISHED testFindAll()\n");
    }

}
