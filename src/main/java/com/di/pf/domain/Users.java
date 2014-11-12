/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.di.pf.domain;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import javax.json.JsonObjectBuilder;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author avg
 */
@Entity
@Table(name = "main.users")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Users.findAll", query = "SELECT u FROM Users u"),
    @NamedQuery(name = "Users.findByUsername", query = "SELECT u FROM Users u WHERE u.username = :username"),
    @NamedQuery(name = "Users.countAll", query = "SELECT count(u) FROM Users u"),})
public class Users extends AbstractEntity {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 250)
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
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 250)
    @Column(name = "shortfio")
    private String shortfio;
    @Size(max = 250)
    @Column(name = "fullfio")
    private String fullfio;
    @Size(max = 250)
    @Column(name = "position")
    private String position;
    @Size(max = 250)
    @Column(name = "userpass")
    private String userpass;
    @Column(name = "startdate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date startdate;
    @Column(name = "enddate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date enddate;
    @Column(name = "isdeleted")
    private Boolean isdeleted;
    @Size(max = 250)
    @Column(name = "certnumber")
    private String certnumber;
    @Column(name = "certdate")
    @Temporal(TemporalType.DATE)
    private Date certdate;
    @JoinColumn(name = "workplace", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Organization workplace;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "usr")
    private List<UserRoles> userRolesList;

    public Users() {
    }

    public Users(Integer id) {
        this.id = id;
    }

    public Users(Integer id, String username, String shortfio) {
        this.id = id;
        this.username = username;
        this.shortfio = shortfio;
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

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getUserpass() {
        return userpass;
    }

    public void setUserpass(String userpass) {
        this.userpass = userpass;
    }

    public Date getStartdate() {
        return startdate;
    }

    public void setStartdate(Date startdate) {
        this.startdate = startdate;
    }

    public Date getEnddate() {
        return enddate;
    }

    public void setEnddate(Date enddate) {
        this.enddate = enddate;
    }

    public Boolean getIsdeleted() {
        return isdeleted;
    }

    public void setIsdeleted(Boolean isdeleted) {
        this.isdeleted = isdeleted;
    }

    public String getCertnumber() {
        return certnumber;
    }

    public void setCertnumber(String certnumber) {
        this.certnumber = certnumber;
    }

    public Date getCertdate() {
        return certdate;
    }

    public void setCertdate(Date certdate) {
        this.certdate = certdate;
    }

    public Organization getWorkplace() {
        return workplace;
    }

    public void setWorkplace(Organization workplace) {
        this.workplace = workplace;
    }

    @XmlTransient
    public List<UserRoles> getUserRolesList() {
        return userRolesList;
    }

    public void setUserRolesList(List<UserRoles> userRolesList) {
        this.userRolesList = userRolesList;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 59 * hash + Objects.hashCode(this.id);
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
        final Users other = (Users) obj;
        return Objects.equals(this.id, other.id);
    }

    @Override
    public String toString() {
        return "com.di.pf.domain.Users[ id=" + id + " ]";
    }

    @Override
    public void addJson(JsonObjectBuilder builder) {
        builder.add("id", id).add("userName", username).add("fio", shortfio).add("workplace", workplace.getId()).add("workplaceName", workplace.getName()).add("roleName", getRoles().toString());

    }

    public StringBuilder getRoles() {
        StringBuilder roles = new StringBuilder();
        int count = userRolesList.size();
        for (int i = 0; i <= count - 1; i++) {
            roles.append(userRolesList.get(i).getUserrole().getCode()).append(",");
        }
        return roles;
    }
}
