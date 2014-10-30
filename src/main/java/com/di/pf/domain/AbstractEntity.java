/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.di.pf.domain;

import java.io.Serializable;
import javax.json.Json;
import javax.json.JsonObjectBuilder;
import com.di.pf.util.JsonItem;
import javax.json.JsonObject;

/**
 *
 * @author avg
 */
public abstract class AbstractEntity implements Serializable, JsonItem {

    @Override
    public JsonObject toJson() {
        JsonObjectBuilder builder = Json.createObjectBuilder();
        addJson(builder);
        return builder.build();
    }

}
