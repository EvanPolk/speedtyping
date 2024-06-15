package dev.evanpolk.WordAPI;

import jakarta.annotation.PostConstruct;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Random;
import java.util.Scanner;

@RestController
@RequestMapping(path = "api/v1")
@CrossOrigin(methods = {RequestMethod.GET, RequestMethod.OPTIONS}, origins = "*")
public class WordResponseController {
    private static ArrayList<String> commonWords;

    @PostConstruct
    public void init() {
        commonWords = new ArrayList<>();
        try {
            File file = new File("./resources/1-1000.txt");
            Scanner sc = new Scanner(file);
            while (sc.hasNextLine()) {
                commonWords.add(sc.nextLine());
            }
            sc.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }

    @GetMapping(path = "/all")
    public ArrayList<String> getAllWords() {
        return commonWords;
    }

    @GetMapping(path = "/word")
    public ArrayList<String> getWords(@RequestParam(required = false) Integer amount) {
        ArrayList<String> res = new ArrayList<>();
        Random r = new Random();
        if (amount == null) {
                res.add(commonWords.get(r.nextInt(commonWords.size())));
                return res;
        }

        if (amount >= commonWords.size()) {
            throw new IllegalArgumentException("Amount of words cannot be larger than: " + commonWords.size());
        }

        int start = r.nextInt(commonWords.size() - amount);
        for (int i = start; i < amount + start; i++) {
            res.add(commonWords.get(i));
        }
        return res;
    }
}

