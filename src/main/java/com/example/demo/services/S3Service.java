package com.example.demo.services;

import java.io.IOException;
import java.io.InputStream;
import org.springframework.stereotype.Service;
import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;

@Service
public class S3Service {

    private String bucketName = "images-daff";
    private Regions regions = Regions.EU_NORTH_1;

    public void uploadToS3(InputStream is, String filename) throws IOException, AmazonServiceException, SdkClientException  {
        AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
                .withRegion(regions).build();
        ObjectMetadata object = new ObjectMetadata();
        object.setContentType("image/*");
        object.setContentLength(is.available());

        PutObjectRequest request = new PutObjectRequest(bucketName, filename, is, object);
        s3Client.putObject(request);
    }
    
}
