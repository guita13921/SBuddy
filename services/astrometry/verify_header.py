from astropy.io import fits

hdul = fits.open("Barnard33_wcs.fits")
hdul[0].header.totextfile("header.txt", overwrite=True)
print("Header written to header.txt")