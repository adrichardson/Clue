class Piece {
    constructor(name, img, img_grayscale, client, color) {
        this.name = name;
        this.img = this.SetImage(img);
        this.img_grayscale = this.SetImage(img_grayscale);
        this.client = client;
        this.color = color;
    }

    SetImage(path)
    {
        var img = new Image();
        img.src = this.GetRelativePath(path);
        return img;
    }

    GetRelativePath(path)
    {
      return './img/people/' + path;
    }
};