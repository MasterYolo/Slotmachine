package model;

import java.util.Random;

/**
 *
 * @author Mikey
 */

public class Slotmachine {

    String result = "";

    public String getRNG(int coin) {
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
                result += "Cherry";
                break;
            case 1:
                result += "Orange";
                break;
            case 2:
                result += "Plum";
                break;
            case 3:
                result += "Bell";
                break;
            case 4:
                result += "Melon";
                break;
            default:
                result += "Bar";
                break;
        }

        switch (b) {
            case 0:
                result += "Cherry";
                break;
            case 1:
                result += "Orange";
                break;
            case 2:
                result += "Plum";
                break;
            case 3:
                result += "Bell";
                break;
            case 4:
                result += "Melon";
                break;
            default:
                result += "Bar";
        }

        switch (c) {
            case 0:
                result += "Cherry";
                break;
            case 1:
                result += "Orange";
                break;
            case 2:
                result += "Plum";
                break;
            case 3:
                result += "Bell";
                break;
            case 4:
                result += "Melon";
                break;
            default:
                result += "Bar";
        }

        if (a != b && a != c && b != c) {
            result += "You have won $0";
        } else if (a == b || a == c || b == c) {
            result += "Congratulations, you have won $" + dubs;
            amountWon += dubs;
        } else if (a == b && a == c && a
                != 0) {
            result += "Congratulations, you have won $" + trips;
            amountWon += trips;
        } else if (a == 0 && b == 0 && c
                == 0) {
            result += "Congratulations! You have won the jackpot of $"
                    + (coin * n);

        }
        result += totalEntered;
        return result;
    }
}
