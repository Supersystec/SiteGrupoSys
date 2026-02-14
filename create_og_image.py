from PIL import Image, ImageDraw, ImageFont
import os

# Criar imagem 1200x630 com canal alpha
width, height = 1200, 630
image = Image.new('RGBA', (width, height), color='#1e3a8a')
draw = ImageDraw.Draw(image)

# Logo - quadrado com borda dourada
logo_size = 280
logo_x = (width - logo_size) // 2
logo_y = 100

# Borda dourada externa
draw.rectangle(
    [(logo_x - 10, logo_y - 10), (logo_x + logo_size + 10, logo_y + logo_size + 10)],
    fill='#c8a960'
)

# Fundo azul do logo
draw.rectangle(
    [(logo_x, logo_y), (logo_x + logo_size, logo_y + logo_size)],
    fill='#1e3a8a'
)

# Tentar carregar fonte, se não conseguir usar padrão
try:
    font_large = ImageFont.truetype("arial.ttf", 120)
    font_title = ImageFont.truetype("arial.ttf", 72)
    font_subtitle = ImageFont.truetype("arial.ttf", 32)
    font_url = ImageFont.truetype("arial.ttf", 24)
except:
    font_large = ImageFont.load_default()
    font_title = ImageFont.load_default()
    font_subtitle = ImageFont.load_default()
    font_url = ImageFont.load_default()

# Texto "GS" no logo
gs_text = "GS"
# Calcular posição centralizada
bbox = draw.textbbox((0, 0), gs_text, font=font_large)
text_width = bbox[2] - bbox[0]
text_height = bbox[3] - bbox[1]
gs_x = logo_x + (logo_size - text_width) // 2
gs_y = logo_y + (logo_size - text_height) // 2 - 20
draw.text((gs_x, gs_y), gs_text, fill='white', font=font_large)

# Linha dourada abaixo do GS
line_width = 140
line_x = logo_x + (logo_size - line_width) // 2
line_y = logo_y + logo_size // 2 + 50
draw.rectangle(
    [(line_x, line_y), (line_x + line_width, line_y + 8)],
    fill='#c8a960'
)

# Título "GrupoSys"
title_text = "GrupoSys"
bbox = draw.textbbox((0, 0), title_text, font=font_title)
text_width = bbox[2] - bbox[0]
title_x = (width - text_width) // 2
draw.text((title_x, 440), title_text, fill='white', font=font_title)

# Subtítulo
subtitle_text = "Soluções em Tecnologia"
bbox = draw.textbbox((0, 0), subtitle_text, font=font_subtitle)
text_width = bbox[2] - bbox[0]
subtitle_x = (width - text_width) // 2
draw.text((subtitle_x, 510), subtitle_text, fill='#c8a960', font=font_subtitle)

# URL
url_text = "www.gruposys.com.br"
bbox = draw.textbbox((0, 0), url_text, font=font_url)
text_width = bbox[2] - bbox[0]
url_x = (width - text_width) // 2
draw.text((url_x, 570), url_text, fill=(255, 255, 255, 200), font=font_url)

# Salvar imagem
output_path = os.path.join(os.path.dirname(__file__), 'og-image.png')
image.save(output_path, 'PNG', optimize=True, quality=95)
print(f"Imagem salva em: {output_path}")
print(f"Tamanho: {os.path.getsize(output_path)} bytes")
