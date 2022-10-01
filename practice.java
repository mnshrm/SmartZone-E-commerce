// Declare and initialize StringBag object bag with name "Fruits" and maxSize 10.
StringBag bag = new StringBag("Fruits",10);
	    
// Insert strings in bag.
bag.insert("Apple");
bag.insert("Banana");
bag.insert("Papaya");
bag.insert("Mango");
bag.insert("Tomato");

// Print status of bag before performing remove operation
System.out.println("Bag before deleting : ");
System.out.println(bag);

//Check if bag is empty or not
if(bag.isEmpty() == false)
{
    // If bag is empty, perform remove operation and print the string which is deleted
    System.out.println("String deleted is " + bag.remove());
    
    // Print status of bag after performing remove operation
    System.out.println("Bag after deleting : ");
    System.out.println(bag);
}
else
{
    // If bag is empty, print error message and return
    System.out.print("Bag is empty, deletion operation not possible.");
}

