package com.mixbook.springmvc.Models;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.CascadeType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name="users")
public class User implements Serializable {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)	
	private Integer user_id;

	@NotNull
	@Size(max=255)   
	@Column(name = "username", nullable = false)
	private String username;

	@NotNull
	@Size(max=255)
	@Column(name = "password", nullable = false)
	private String password;

	@NotNull
	@Size(max=255)
	@Column(name = "first_name", nullable = false)
	private String first_name;

	@NotNull
	@Size(max=255)
	@Column(name = "last_name", nullable = false)
	private String last_name;

	@NotNull
	@Size(max=255)
	@Column(name = "email", nullable = false)
	private String email;

	@Column(name = "ENABLED")
	@NotNull
	private Boolean enabled;

	@Column(name = "LASTPASSWORDRESETDATE")
	@Temporal(TemporalType.TIMESTAMP)
	@NotNull
	private Date lastPasswordResetDate;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(
			name = "USER_AUTHORITY",
			joinColumns = {@JoinColumn(name = "USER_ID", referencedColumnName = "user_id")},
			inverseJoinColumns = {@JoinColumn(name = "AUTHORITY_ID", referencedColumnName = "ID")})
	private List<Authority> authorities;

	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinTable(name = "user_has_brand", joinColumns = {
			@JoinColumn(name = "user_user_id", nullable = false, updatable = false) },
	inverseJoinColumns = { @JoinColumn(name = "brand_brand_id",
	nullable = false, updatable = false) })
	private Set<Brand> brands = new HashSet<Brand>(0);

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
	private Set<Recipe> recipes = new HashSet<Recipe>(0);

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "pk.user", cascade=CascadeType.ALL)
	private Set<UserRecipeHasReview> userRecipeHasReviews = new HashSet<UserRecipeHasReview>(0);

	public User() {

	}

	public User(Integer user_id, String username, String password, String first_name, String last_name,
			String email, Boolean enabled, Date lastPasswordResetDate, List<Authority> authorities, 
			Set<Brand> brands, Set<Recipe> recipes, Set<UserRecipeHasReview> userRecipeHasReviews) {
		this.user_id = user_id;
		this.username = username;	
		this.password = password;
		this.first_name = first_name;
		this.last_name = last_name;
		this.email = email;
		this.enabled = enabled;
		this.lastPasswordResetDate = lastPasswordResetDate;
		this.authorities = authorities;
		this.brands = brands;
		this.recipes = recipes;
		this.userRecipeHasReviews = userRecipeHasReviews;
	}

	public Integer getUserId() {
		return user_id;
	}
	public void setUserId(Integer user_id) {
		this.user_id = user_id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFirstName() {
		return first_name;
	}

	public void setFirstName(String first_name) {
		this.first_name = first_name;
	}

	public String getLastName() {
		return last_name;
	}

	public void setLastName(String last_name) {
		this.last_name = last_name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	public List<Authority> getAuthorities() {
		return authorities;
	}

	public void setAuthorities(List<Authority> authorities) {
		this.authorities = authorities;
	}

	public Date getLastPasswordResetDate() {
		return lastPasswordResetDate;
	}

	public void setLastPasswordResetDate(Date lastPasswordResetDate) {
		this.lastPasswordResetDate = lastPasswordResetDate;
	}

	public Set<Brand> getBrands() {
		return brands;
	}

	public void setBrands(Set<Brand> brands) {
		this.brands = brands;
	}

	public Set<Recipe> getRecipes() {
		return recipes;
	}

	public void setRecipes(Set<Recipe> recipes) {
		this.recipes = recipes;
	}

	public Set<UserRecipeHasReview> getUserRecipeHasReviews() {
		return userRecipeHasReviews;
	}

	public void setUserRecipeHasReviews(Set<UserRecipeHasReview> userRecipeHasReviews) {
		this.userRecipeHasReviews = userRecipeHasReviews;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((user_id == null) ? 0 : user_id.hashCode());
		result = prime * result + ((username == null) ? 0 : username.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (!(obj instanceof User))
			return false;
		User other = (User) obj;
		if (user_id == null) {
			if (other.user_id != null)
				return false;
		} else if (!user_id.equals(other.user_id))
			return false;
		if (username == null) {
			if (other.username != null)
				return false;
		} else if (!username.equals(other.username))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "User [user_id=" + user_id + ", first_name=" + first_name + ", last_name=" + last_name
				+ ", email=" + email + "]";
	}

}
