package com.mixbook.springmvc.DAO;

import javax.persistence.PersistenceException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.mixbook.springmvc.Models.User;
import com.mixbook.springmvc.Services.UserService;

@Repository("userDao")
public class UserDaoImpl extends AbstractDao<Integer, User> implements UserDao {

	@Autowired
	UserService userService;

	private static final Logger logger = LogManager.getLogger(UserDaoImpl.class);

	public User findByEntityUsername(String username) throws Exception {
		Criteria crit = createEntityCriteria();
		crit.add(Restrictions.eq("username", username));
		User user = (User)crit.uniqueResult();
		return user;
	}

	public void createUser(User user) throws PersistenceException, Exception {
		persist(user);
	}

	public void deleteUser(User user) throws Exception {
		user = this.userService.findByEntityUsername(user.getUsername());
		SQLQuery updateQuery = getSession().createSQLQuery("UPDATE recipe r1 INNER JOIN users_recipe_has_review r2 ON r1.recipe_id = r2.recipe_recipe_id SET r1.number_of_ratings = r1.number_of_ratings - 1, r1.total_rating = r1.total_rating - r2.rating WHERE r2.users_user_id = ?");
		updateQuery.setParameter(0, user.getUserId());
		updateQuery.executeUpdate();
		Query query = getSession().createQuery("delete User where username = :username");
		query.setParameter("username", user.getUsername());
		query.executeUpdate();
	}

	public void editUser(User user) throws Exception {
		//Updating both first name and last name
		if (user.getFirstName() != null && user.getLastName() != null ) {
			Query q = getSession().createQuery("update User set first_name = :first_name, last_name = :last_name where username = :username");
			q.setParameter("first_name", user.getFirstName());
			q.setParameter("last_name", user.getLastName());
			q.setParameter("username", user.getUsername());
			q.executeUpdate();
		}
		//Updating last name
		else if (user.getLastName() != null) {
			Query q = getSession().createQuery("update User set last_name = :last_name where username = :username");
			q.setParameter("last_name", user.getLastName());
			q.setParameter("username", user.getUsername());
			q.executeUpdate();
		}
		//Updating first name
		else if (user.getFirstName() != null) {
			Query q = getSession().createQuery("update User set first_name = :first_name where username = :username");
			q.setParameter("first_name", user.getFirstName());
			q.setParameter("username", user.getUsername());
			q.executeUpdate();
		}
		//All fields were null
		else {
			logger.error("Invalid request! Nothing was received to update!");
		}

	}

	public void changeEmail(User user) throws PersistenceException, Exception {
		Query q = getSession().createQuery("update User set email = :email where username = :username");
		q.setParameter("email", user.getEmail());
		q.setParameter("username", user.getUsername());
		q.executeUpdate();
	}

	public void changePassword(User user) throws Exception {
		Query q = getSession().createQuery("update User set password = :password where username = :username");
		q.setParameter("password", user.getPassword());
		q.setParameter("username", user.getUsername());
		q.executeUpdate();
	}

}
