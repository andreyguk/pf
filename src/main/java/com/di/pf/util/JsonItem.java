/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.di.pf.util;

import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

/**
 *
 * @author avg
 */
public interface JsonItem {

    public JsonObject toJson();

    public void addJson(JsonObjectBuilder builder);
}
