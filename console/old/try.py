from tkinter import *
from PIL import Image, ImageTk

class App(Frame):
  def __init__(self, master):
      Frame.__init__(self, master)
      self.grid(row=0)
      self.columnconfigure(0,weight=1)
      self.rowconfigure(0,weight=1)
      self.original = Image.open('images/clock01.gif')
      resized = self.original.resize((800, 600),Image.ANTIALIAS)
      self.image = ImageTk.PhotoImage(resized) # Keep a reference, prevent GC
      self.frame = Label(self, image = self.image)
      self.frame.grid(row=0)


root = Tk()
app = App(root)
app.mainloop()
root.destroy()
