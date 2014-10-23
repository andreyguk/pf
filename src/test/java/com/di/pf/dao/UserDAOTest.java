/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.di.pf.dao;

import com.di.pf.domain.Users;
import java.util.List;
import static org.junit.Assert.assertTrue;
import org.junit.Test;

/**
 *
 * @author avg
 */
public class UserDAOTest extends AbstractDAOTest {

    public UserDAOTest() {
    }

    /**
     *
     * @throws Exception
     */
    @Test
    public void testFindAll() throws Exception {

        logger.debug("\nSTARTED testFindAll()\n");
        int rowCount = countRowsInTable("model.users");

        if (rowCount > 0) {

            List<Users> allItems = usersDAO.findAll();
            assertTrue("Users.findAll list not equal to row count of table organization", rowCount == allItems.size());

        } else {
            throw new IllegalStateException("INVALID TESTING SCENARIO: Company table is empty");
        }
        logger.debug("\nFINISHED testFindAll()\n");
    }
}
