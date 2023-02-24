FROM fedora:20

RUN yum update -y &&            \
  yum install -y pdftk &&     \
  yum clean all

WORKDIR /workdir

ENTRYPOINT ["/usr/bin/pdftk"]

CMD ["--help"]
