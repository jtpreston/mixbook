package com.mixbook.springmvc.DAO;

import java.math.BigInteger;
import java.util.List;

import javax.persistence.PersistenceException;

import org.hibernate.SQLQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.mixbook.springmvc.Exceptions.MaxInventoryItemsException;
import com.mixbook.springmvc.Exceptions.NoDataWasChangedException;
import com.mixbook.springmvc.Models.Brand;
import com.mixbook.springmvc.Models.User;
import com.mixbook.springmvc.Services.UserService;

@Repository("inventoryDao")
public class InventoryDaoImpl extends AbstractDao<Integer, Brand> implements InventoryDao {

	@Autowired
	UserService userService;

	public void addIngredientToInventory(Brand brand, User user) throws MaxInventoryItemsException, NullPointerException, PersistenceException, NoDataWasChangedException, Exception {
		user = this.userService.findByEntityUsername(user.getUsername());
		SQLQuery countQuery = getSession().createSQLQuery("SELECT COUNT(*) FROM user_has_brand WHERE user_user_id = ?").setParameter(0, user.getUserId());
		Integer count = ((BigInteger) countQuery.uniqueResult()).intValue();
		if (count == 20) {
			throw new MaxInventoryItemsException("Maximum number of ingredients in inventory exceeded!");
		}
		SQLQuery searchQuery = getSession().createSQLQuery("SELECT brand_id FROM brand WHERE brand_name = ?");
		searchQuery.setParameter(0, brand.getBrandName());
		Integer brand_id = ((BigInteger) searchQuery.uniqueResult()).intValue();
		brand.setBrandId(brand_id);
		SQLQuery insertQuery = getSession().createSQLQuery("" + "INSERT INTO user_has_brand(user_user_id,brand_brand_id)VALUES(?,?)");
		insertQuery.setParameter(0, user.getUserId());
		insertQuery.setParameter(1, brand.getBrandId());
		int numRowsAffected = insertQuery.executeUpdate();
		if (numRowsAffected < 1) {
			throw new NoDataWasChangedException("No data was changed! Info may have been invalid!");
		}
	}

	public void deleteIngredientFromInventory(Brand brand, User user) throws NullPointerException, NoDataWasChangedException, Exception {
		user = this.userService.findByEntityUsername(user.getUsername());
		SQLQuery searchQuery = getSession().createSQLQuery("SELECT brand_id FROM brand WHERE brand_name = ?");
		searchQuery.setParameter(0, brand.getBrandName());
		Integer brand_id = ((BigInteger) searchQuery.uniqueResult()).intValue();
		brand.setBrandId(brand_id);
		SQLQuery deleteQuery = getSession().createSQLQuery("DELETE FROM user_has_brand WHERE user_user_id=:user_user_id AND brand_brand_id=:brand_brand_id").setParameter("user_user_id", user.getUserId()).setParameter("brand_brand_id", brand.getBrandId());
		int numRowsAffected = deleteQuery.executeUpdate();
		if (numRowsAffected < 1) {
			throw new NoDataWasChangedException("No data was changed! Info may have been invalid!");
		}
	}

	public List<Brand> getUserInventory(User user) throws Exception {
		user = this.userService.findByEntityUsername(user.getUsername());
		SQLQuery query = getSession().createSQLQuery("SELECT brand_name FROM brand INNER JOIN user_has_brand ON brand.brand_id = user_has_brand.brand_brand_id WHERE user_has_brand.user_user_id = ?").setParameter(0, user.getUserId());
		List result = query.list();
		return result;
	}

}
