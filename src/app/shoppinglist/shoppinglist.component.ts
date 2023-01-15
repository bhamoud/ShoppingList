import { Component, OnInit } from '@angular/core';
import { ShoppinglistService } from '../shoppinglist.service';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.scss']
})
export class ShoppinglistComponent implements OnInit {

  shoppingItems: any[] = [];
  constructor(private shoppingListService: ShoppinglistService) { }

  ngOnInit(): void {
    this.shoppingListService.firestoreCollection.valueChanges({ idField: 'id' })
      .subscribe(item => {
        this.shoppingItems = item.sort((a: any, b: any) => {
          return a.isDone - b.isDone
        });
      })
  }

  onClick(itemInput: HTMLInputElement) {
    if (itemInput.value) {
      this.shoppingListService.addItem(itemInput.value);
      itemInput.value = "";
    }
  }

  onStatusChange(id: string, newStatus: boolean) {
    this.shoppingListService.updateShoppingListStatus(id, newStatus);
  }

  onDelete(id: string) {
    this.shoppingListService.deleteShoppingItem(id);
  }

  logOut() {
    this.shoppingListService.logOut();
  }

}
