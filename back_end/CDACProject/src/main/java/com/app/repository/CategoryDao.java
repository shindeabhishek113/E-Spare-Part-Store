package com.app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Category;
import com.app.entities.Product;

public interface CategoryDao extends JpaRepository<Category, Long> {

	//Optional<Category> findByCategoryName(String categoryName);
	
}//End of CategoryDao
