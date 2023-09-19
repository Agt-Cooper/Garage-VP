from django.db import models


class Service(models.Model):
    name = models.CharField(max_length=200)
    price = models.FloatField()
    picture = models.ImageField(upload_to="product_images")
    enabled = models.BooleanField()

    def __str__(self):
        return f"{self.name} [{self.enabled}]"

    def desc(self):
        result = {
            'id': self.id,
            'name': self.name,
            'price': self.price,
        }

        if self.picture:
            result['picture'] = self.picture.url
        else:
            result['picture'] = None

        return result
