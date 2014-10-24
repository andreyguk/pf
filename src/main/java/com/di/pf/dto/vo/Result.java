/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.di.pf.dto.vo;

import java.io.Serializable;
import java.util.List;

/**
 *
 * @author avg
 */
public class Result<T> implements Serializable {

    final private boolean success;
    final private T data;
    final private String msg;

    public Result(boolean success, T data) {
        this.success = success;
        this.data = data;
        this.msg = null;
    }

    public Result(boolean success, String msg) {
        this.success = success;
        this.data = null;
        this.msg = msg;
    }

    public boolean isSuccess() {
        return success;
    }

    public T getData() {
        return data;
    }

    public String getMsg() {
        return msg;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("\"Result{\"");
        sb.append("success=").append(success);
        sb.append(", msg=").append(msg);
        sb.append(", data=").append(msg);

        if (data == null) {
            sb.append("null");
        } else if (data instanceof List) {
            List castList = (List) data;
            if (castList.isEmpty()) {
                sb.append("List empty");
            } else {
                Object firstItem = castList.get(0);
                sb.append("List of").append(firstItem.getClass());
            }

        } else {
            sb.append(data.toString());
        }
        sb.append("}");
        return sb.toString();
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 41 * hash + (this.success ? 1 : 0);
        hash = 41 * hash + (this.data != null ? this.data.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Result<?> other = (Result<?>) obj;
        return this.success == other.success;
    }

}
