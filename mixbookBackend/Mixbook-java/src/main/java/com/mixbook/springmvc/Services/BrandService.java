package com.mixbook.springmvc.Services;

import java.util.List;

import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
import com.mixbook.springmvc.Models.Brand;

public interface BrandService {

	List<String> getBrands() throws UnknownServerErrorException;

}
