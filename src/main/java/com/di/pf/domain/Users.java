/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.di.pf.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import javax.json.JsonObjectBuilder;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author avg
 */
@Entity
@Table(name = "model.users")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Users.findAll", query = "SELECT u FROM Users u"),
    @NamedQuery(name = "Users.findById", query = "SELECT u FROM Users u WHERE u.id = :id"),
    @NamedQuery(name = "Users.findByUsername", query = "SELECT u FROM Users u WHERE u.username = :username"),
    @NamedQuery(name = "Users.findByLastname", query = "SELECT u FROM Users u WHERE u.lastname = :lastname"),
    @NamedQuery(name = "Users.findByFirstname", query = "SELECT u FROM Users u WHERE u.firstname = :firstname"),
    @NamedQuery(name = "Users.findByMiddlename", query = "SELECT u FROM Users u WHERE u.middlename = :middlename"),
    @NamedQuery(name = "Users.findByShortfio", query = "SELECT u FROM Users u WHERE u.shortfio = :shortfio"),
    @NamedQuery(name = "Users.findByFullfio", query = "SELECT u FROM Users u WHERE u.fullfio = :fullfio"),
    @NamedQuery(name = "Users.findByRoleStr", query = "SELECT u FROM Users u WHERE u.roleStr = :roleStr")})
public class Users extends AbstractEntity {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Size(max = 250)
    @Column(name = "username")
    private String username;
    @Size(max = 250)
    @Column(name = "lastname")
    private String lastname;
    @Size(max = 250)
    @Column(name = "firstname")
    private String firstname;
    @Size(max = 250)
    @Column(name = "middlename")
    private String middlename;
    @Size(max = 250)
    @Column(name = "shortfio")
    private String shortfio;
    @Size(max = 250)
    @Column(name = "fullfio")
    private String fullfio;
    @Size(max = 250)
    @Column(name = "roleStr")
    private String roleStr;

    public Users() {
    }

    public Users(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getMiddlename() {
        return middlename;
    }

    public void setMiddlename(String middlename) {
        this.middlename = middlename;
    }

    public String getShortfio() {
        return shortfio;
    }

    public void setShortfio(String shortfio) {
        this.shortfio = shortfio;
    }

    public String getFullfio() {
        return fullfio;
    }

    public void setFullfio(String fullfio) {
        this.fullfio = fullfio;
    }

    public String getRoleStr() {
        return roleStr;
    }

    public void setRoleStr(String roleStr) {
        this.roleStr = roleStr;
    }

    public boolean isAdmin() {
        return roleStr == null ? false : roleStr.equals("admin");
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Users)) {
            return false;
        }
        Users other = (Users) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.di.pf.domain.Users_1[ id=" + id + " ]";
    }

    @Override
    public void addJson(JsonObjectBuilder builder) {
        builder.add("id", id).add("userName", username).add("fio", shortfio).add("workplace", "workplace").add("workplaceName", "workplaceName").add("roleName", roleStr);

    }
}
