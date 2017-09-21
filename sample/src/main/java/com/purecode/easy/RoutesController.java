package com.purecode.ezy;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by phitien on 6/4/17.
 */
@Controller
public class RoutesController {

    @RequestMapping(value="/{app:^((?!static).)*$}/**", method=RequestMethod.GET)
    public String index(@PathVariable String app) {
        return app;
    }

}
