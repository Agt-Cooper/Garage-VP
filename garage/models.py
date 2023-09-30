from django.db import models

class Product(models.Model):
    manufacturer = models.CharField(max_length=200)
    model_name   = models.CharField(max_length=200)
    price        = models.FloatField()
    picture      = models.ImageField(upload_to="product_images")
    enabled      = models.BooleanField()
    year         = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.manufacturer}/{self.model_name} [{self.enabled}]"

    def desc(self):
        result = {
            'id': self.id,
            'manufacturer': self.manufacturer,
            'model_name': self.model_name,
            'price': self.price,
            'year': self.year,
            'enabled': self.enabled,
        }

        if self.picture:
            result['picture'] = self.picture.url
        else:
            result['picture'] = None

        return result

class OpeningHours(models.Model):
    weekday = models.CharField(max_length=200)
    opening_time = models.CharField(max_length=200)
    closing_time = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.weekday}: {self.opening_time} - {self.closing_time}"

    def desc(self):
        return {
                'weekday': self.weekday,
                'opening_time': self.opening_time,
                'closing_time': self.closing_time,
        }

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
            'enabled': self.enabled,
        }

        if self.picture:
            result['picture'] = self.picture.url
        else:
            result['picture'] = None

        return result
