package model;

import java.util.Random;
import org.json.simple.JSONObject;

/**
 * Class to generate random answers to the slotmachine.
 * @author Michael Lindell, Max Topsholm.
 */
public class Slotmachine {

    public String getRNG(int coin) {
        //JSONArray SlotmachineResult = new JSONArray();
        JSONObject object = new JSONObject();
        // {"Column1": "Bell","Bell","Melon"}
        
        String result, result2, result3;
        
        result = result2 = result3 = "";
        
        Random random = new Random();
        String cont = "n";
        char answer;
        coin = 0;
        int totalEntered = 0;
        int a;
        int b;
        int c;
        int n;
        int amountWon = 0;
        int dubs = coin * 2;
        int trips = coin * 4;

        a = random.nextInt(6);
        b = random.nextInt(6);
        c = random.nextInt(6);
        n = random.nextInt(991) + 10;
        totalEntered += coin;

        switch (a) {
            case 0:
                result += "dollar";
                break;
            case 1:
                result += "bolt";
                break;
            case 2:
                result += "gold";
                break;
            case 3:
                result += "box";
                break;
            case 4:
                result += "goldhelm";
                break;
            default:
                result += "hammer";
                break;
        }
        
        object.put("Column1", result);

        switch (b) {
            case 0:
                result2 += "dollar";
                break;
            case 1:
                result2 += "bolt";
                break;
            case 2:
                result2 += "gold";
                break;
            case 3:
                result2 += "box";
                break;
            case 4:
                result2 += "goldhelm";
                break;
            default:
                result2 += "hammer";
        }

        object.put("Column2", result2);
        
        switch (c) {
            case 0:
                result3 += "dollar";
                break;
            case 1:
                result3 += "bolt";
                break;
            case 2:
                result3 += "gold";
                break;
            case 3:
                result3 += "box";
                break;
            case 4:
                result3 += "goldhelm";
                break;
            default:
                result3 += "hammer";
        }
        
         object.put("Column3", result3);

        if (a != b && a != c && b != c) {
            result = "You have won $0";
        } else if (a == b || a == c || b == c) {
            result = "Congratulations, you have won $" + dubs;
            amountWon += dubs;
        } else if (a == b && a == c && a
                != 0) {
            result = "Congratulations, you have won $" + trips;
            amountWon += trips;
        } else if (a == 0 && b == 0 && c
                == 0) {
            result = "Congratulations! You have won the jackpot of $"
                    + (coin * n);

        }
        
        object.put("Result", result);
        
        object.put("AmountWon", amountWon);
        
        return object.toString();
    }
}
