/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.di.pf.domain;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author avg
 */
@Entity
@Table(name = "organization")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Organization.findAll", query = "SELECT o FROM Organization o"),
    @NamedQuery(name = "Organization.findById", query = "SELECT o FROM Organization o WHERE o.id = :id"),
    @NamedQuery(name = "Organization.findByCode", query = "SELECT o FROM Organization o WHERE o.code = :code"),
    @NamedQuery(name = "Organization.findByName", query = "SELECT o FROM Organization o WHERE o.name = :name"),
    @NamedQuery(name = "Organization.findByBranchcode", query = "SELECT o FROM Organization o WHERE o.branchcode = :branchcode"),
    @NamedQuery(name = "Organization.findByOrganhead", query = "SELECT o FROM Organization o WHERE o.organhead = :organhead"),
    @NamedQuery(name = "Organization.findByAddress", query = "SELECT o FROM Organization o WHERE o.address = :address"),
    @NamedQuery(name = "Organization.findByCertnumber", query = "SELECT o FROM Organization o WHERE o.certnumber = :certnumber"),
    @NamedQuery(name = "Organization.findByCertdate", query = "SELECT o FROM Organization o WHERE o.certdate = :certdate"),
    @NamedQuery(name = "Organization.findByIsdeleted", query = "SELECT o FROM Organization o WHERE o.isdeleted = :isdeleted"),
    @NamedQuery(name = "Organization.findByDeletedate", query = "SELECT o FROM Organization o WHERE o.deletedate = :deletedate"),
    @NamedQuery(name = "Organization.findByBankreq", query = "SELECT o FROM Organization o WHERE o.bankreq = :bankreq"),
    @NamedQuery(name = "Organization.findByPhone", query = "SELECT o FROM Organization o WHERE o.phone = :phone"),
    @NamedQuery(name = "Organization.findByEmail", query = "SELECT o FROM Organization o WHERE o.email = :email")})
public class Organization implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 250)
    @Column(name = "code")
    private String code;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 250)
    @Column(name = "name")
    private String name;
    @Size(max = 250)
    @Column(name = "branchcode")
    private String branchcode;
    @Size(max = 250)
    @Column(name = "organhead")
    private String organhead;
    @Size(max = 250)
    @Column(name = "address")
    private String address;
    @Size(max = 250)
    @Column(name = "certnumber")
    private String certnumber;
    @Column(name = "certdate")
    @Temporal(TemporalType.DATE)
    private Date certdate;
    @Basic(optional = false)
    @NotNull
    @Column(name = "isdeleted")
    private boolean isdeleted;
    @Column(name = "deletedate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date deletedate;
    @Size(max = 250)
    @Column(name = "bankreq")
    private String bankreq;
    // @Pattern(regexp="^\\(?(\\d{3})\\)?[- ]?(\\d{3})[- ]?(\\d{4})$", message="Недопустимый формат номера телефона/факса (должен иметь формат xxx-xxx-xxxx)")//if the field contains phone or fax number consider using this annotation to enforce field validation
    @Size(max = 250)
    @Column(name = "phone")
    private String phone;
    // @Pattern(regexp="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", message="Недопустимый адрес электронной почты")//if the field contains email address consider using this annotation to enforce field validation
    @Size(max = 250)
    @Column(name = "email")
    private String email;

    public Organization() {
    }

    public Organization(Integer id) {
        this.id = id;
    }

    public Organization(Integer id, String code, String name, boolean isdeleted) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.isdeleted = isdeleted;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBranchcode() {
        return branchcode;
    }

    public void setBranchcode(String branchcode) {
        this.branchcode = branchcode;
    }

    public String getOrganhead() {
        return organhead;
    }

    public void setOrganhead(String organhead) {
        this.organhead = organhead;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
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

    public boolean getIsdeleted() {
        return isdeleted;
    }

    public void setIsdeleted(boolean isdeleted) {
        this.isdeleted = isdeleted;
    }

    public Date getDeletedate() {
        return deletedate;
    }

    public void setDeletedate(Date deletedate) {
        this.deletedate = deletedate;
    }

    public String getBankreq() {
        return bankreq;
    }

    public void setBankreq(String bankreq) {
        this.bankreq = bankreq;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
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
        final Organization other = (Organization) obj;
        return Objects.equals(this.id, other.id);
    }

    

    @Override
    public String toString() {
        return "com.di.pf.domain.Organization[ id=" + id + " ]";
    }
    
}
