/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller;

import javax.ejb.Singleton;
import model.Slotmachine;

/**
 *
 * @author Mikey
 */
@Singleton
public class Controller {

    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")
    public Controller() {

    }

    private Slotmachine machine;

    public String startGame(int coin) {
        machine = new Slotmachine();
        return machine.getRNG(coin);
    }

}
