package com.mixbook.springmvc.Services;

import java.util.List;

import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
import com.mixbook.springmvc.Models.Style;

public interface StyleService {

	List<Style> getStyles() throws UnknownServerErrorException;

}
