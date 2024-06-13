package dev.evanpolk.wordapi;

import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Random;
import java.util.Scanner;

@RestController
@RequestMapping(path = "api/v1")
public class WordApiController {
    private static ArrayList<String> commonWords = new ArrayList<>();

    public static void main(String[] args) {
        try {
            File file = new File("./src/main/java/dev/evanpolk/wordapi/google-10000-medium.txt");
            Scanner sc = new Scanner(file);
            while (sc.hasNextLine()) {
                commonWords.add(sc.nextLine());
            }
            sc.close();
        } catch (FileNotFoundException e) {
            System.out.println("An error in reading text files occurred.");
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
            throw new IllegalArgumentException("ERROR, Amount of words cannot be larger than: " + commonWords.size());
        }

        int start = r.nextInt(commonWords.size() - amount);
        for (int i = start; i < commonWords.size(); i++) {
            res.add(commonWords.get(i));
        }
        return res;
    }
}
